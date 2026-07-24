import { Like } from "../models/Like";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { ServiceError } from "./auth.service";

const TARGET_MODELS = {
  post: Post,
  comment: Comment,
} as const;

export type TargetType = keyof typeof TARGET_MODELS;

export const toggleLikeService = async (
  userId: number,
  targetId: string,
  targetType: TargetType
) => {
  const TargetModel = TARGET_MODELS[targetType];
  if (!TargetModel) {
    const error: ServiceError = new Error("Invalid target type");
    error.statusCode = 400;
    throw error;
  }

  // 1. Verify target post or comment exists
  const targetExists = await TargetModel.exists({ _id: targetId });
  if (!targetExists) {
    const error: ServiceError = new Error(`${targetType} not found`);
    error.statusCode = 404;
    throw error;
  }

  // 2. Check if user already liked the target
  const existingLike = await Like.findOne({ user: userId, targetId, targetType });

  let liked: boolean;
  let delta: number;

  if (existingLike) {
    await existingLike.deleteOne();
    liked = false;
    delta = -1;
  } else {
    await Like.create({ user: userId, targetId, targetType });
    liked = true;
    delta = 1;
  }

  // 3. Atomically update target likes_count
  const updatedTarget = await TargetModel.findByIdAndUpdate(
    targetId,
    { $inc: { likes_count: delta } },
    { new: true }
  );

  return {
    liked,
    likes_count: updatedTarget?.likes_count ?? 0,
  };
};

export const checkLikeStatusService = async (
  userId: number,
  targetId: string,
  targetType: TargetType
) => {
  const existingLike = await Like.findOne({ user: userId, targetId, targetType });
  return { liked: !!existingLike };
};
