import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { Like } from "../models/Like";
import { AuthUser } from "../middleware/auth";
import { ServiceError } from "./auth.service";

export interface CreateCommentInput {
  postId: string;
  content: string;
  user: AuthUser;
}

export const getCommentsByPostId = async (postId: string, userId?: number) => {
  const postExists = await Post.exists({ _id: postId });
  if (!postExists) {
    const error: ServiceError = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  const rawComments = await Comment.find({ post: postId })
    .sort({ createdAt: 1 })
    .lean();

  if (!rawComments || rawComments.length === 0) {
    return [];
  }

  const comments = rawComments as any[];

  if (!userId) {
    return comments.map((c) => ({
      ...c,
      id: c._id.toString(),
      likedByCurrentUser: false,
    }));
  }

  const commentIds = comments.map((c) => c._id);
  const userLikes = await Like.find({
    user: userId,
    targetType: "comment",
    targetId: { $in: commentIds },
  }).select("targetId").lean();

  const likedSet = new Set((userLikes as any[]).map((l) => l.targetId.toString()));

  return comments.map((c) => ({
    ...c,
    id: c._id.toString(),
    likedByCurrentUser: likedSet.has(c._id.toString()),
  }));
};

export const createComment = async ({
  postId,
  content,
  user,
}: CreateCommentInput) => {
  if (!postId || !content || !content.trim()) {
    const error: ServiceError = new Error("postId and content are required");
    error.statusCode = 400;
    throw error;
  }

  const post = await Post.findById(postId);
  if (!post) {
    const error: ServiceError = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  const comment = await Comment.create({
    post: postId,
    content: content.trim(),
    author: {
      uid: user.id,
      username: user.username,
    },
    likes_count: 0,
  });

  // Increment comment count on parent post
  await Post.findByIdAndUpdate(postId, { $inc: { comment_count: 1 } });

  return {
    ...comment.toObject(),
    id: comment._id.toString(),
    likedByCurrentUser: false,
  };
};

export const deleteComment = async (commentId: string, user: AuthUser) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    const error: ServiceError = new Error("Comment not found");
    error.statusCode = 404;
    throw error;
  }

  if (!comment.author || comment.author.uid !== user.id) {
    const error: ServiceError = new Error("Unauthorized to delete this comment");
    error.statusCode = 403;
    throw error;
  }

  const postId = comment.post;
  await Comment.findByIdAndDelete(commentId);

  // Decrement comment count on parent post
  await Post.findByIdAndUpdate(postId, { $inc: { comment_count: -1 } });

  return { message: "Comment deleted successfully" };
};
