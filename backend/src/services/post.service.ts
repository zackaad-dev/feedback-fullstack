import { Post } from "../models/Post";
import { Like } from "../models/Like";
import { AuthUser } from "../middleware/auth";
import { ServiceError } from "./auth.service";

export interface CreatePostInput {
  title?: string;
  content?: string;
  user: AuthUser;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  user: AuthUser;
}

export const getAllPosts = async (userId?: number) => {
  const rawPosts = await Post.find().sort({ createdAt: -1 }).lean();

  if (!rawPosts || rawPosts.length === 0) {
    return [];
  }

  const posts = rawPosts as any[];

  if (!userId) {
    return posts.map((p) => ({
      ...p,
      id: p._id.toString(),
      likedByCurrentUser: false,
    }));
  }

  const postIds = posts.map((p) => p._id);
  const userLikes = await Like.find({
    user: userId,
    targetType: "post",
    targetId: { $in: postIds },
  }).select("targetId").lean();

  const likedSet = new Set((userLikes as any[]).map((l) => l.targetId.toString()));

  return posts.map((p) => ({
    ...p,
    id: p._id.toString(),
    likedByCurrentUser: likedSet.has(p._id.toString()),
  }));
};

export const getPostById = async (id: string, userId?: number) => {
  const rawPost = await Post.findById(id).lean();
  if (!rawPost) {
    const error: ServiceError = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  const post = rawPost as any;

  let likedByCurrentUser = false;
  if (userId) {
    const existingLike = await Like.findOne({
      user: userId,
      targetType: "post",
      targetId: id,
    });
    likedByCurrentUser = !!existingLike;
  }

  return {
    ...post,
    id: post._id.toString(),
    likedByCurrentUser,
  };
};

export const createPost = async ({
  title,
  content,
  user,
}: CreatePostInput) => {
  if (!title || !content) {
    const error: ServiceError = new Error("Title and content are required");
    error.statusCode = 400;
    throw error;
  }

  const post = await Post.create({
    title: title.trim(),
    content: content.trim(),
    author: {
      uid: user.id,
      username: user.username,
    },
  });

  return {
    ...post.toObject(),
    id: post._id.toString(),
    likedByCurrentUser: false,
  };
};

export const updatePost = async (
  id: string,
  { title, content, user }: UpdatePostInput
) => {
  const post = await Post.findById(id);
  if (!post) {
    const error: ServiceError = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  if (!post.author || post.author.uid !== user.id) {
    const error: ServiceError = new Error("Unauthorized to update this post");
    error.statusCode = 403;
    throw error;
  }

  if (title) post.title = title.trim();
  if (content) post.content = content.trim();

  await post.save();
  return {
    ...post.toObject(),
    id: post._id.toString(),
  };
};

export const deletePost = async (id: string, user: AuthUser) => {
  const post = await Post.findById(id);
  if (!post) {
    const error: ServiceError = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  if (!post.author || post.author.uid !== user.id) {
    const error: ServiceError = new Error("Unauthorized to delete this post");
    error.statusCode = 403;
    throw error;
  }

  await Post.findByIdAndDelete(id);
  return { message: "Post deleted successfully" };
};
