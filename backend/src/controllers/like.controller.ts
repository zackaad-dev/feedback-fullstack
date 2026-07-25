import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import * as likeService from "../services/like.service";
import { ServiceError } from "../services/auth.service";

export const toggleLike = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { targetId } = req.params;
    const { targetType } = req.body;

    if (!targetId || !targetType) {
      return res.status(400).json({ error: "targetId and targetType are required" });
    }

    const result = await likeService.toggleLikeService(
      req.user.id,
      targetId as string,
      targetType as likeService.TargetType
    );

    return res.status(200).json(result);
  } catch (error) {
    const err = error as ServiceError;
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Error toggling like:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
