import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import * as commentService from "../services/comment.service";
import { ServiceError } from "../services/auth.service";

export const getComments = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const postId = (req.params.postId || req.query.postId) as string;
    if (!postId) {
      return res.status(400).json({ error: "postId is required" });
    }

    const comments = await commentService.getCommentsByPostId(
      postId,
      req.user?.id
    );
    return res.status(200).json({ comments });
  } catch (error) {
    const err = error as ServiceError;
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const postId = req.body.postId || req.params.postId;
    const { content } = req.body;

    if (!postId || !content) {
      return res.status(400).json({ error: "postId and content are required" });
    }

    const comment = await commentService.createComment({
      postId,
      content,
      user: req.user,
    });

    return res.status(201).json({ message: "Comment created", comment });
  } catch (error) {
    const err = error as ServiceError;
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Error creating comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const id = req.params.id as string;
    const result = await commentService.deleteComment(id, req.user);
    return res.status(200).json(result);
  } catch (error) {
    const err = error as ServiceError;
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Error deleting comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
