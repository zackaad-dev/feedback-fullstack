import { Post } from "../models/Post";
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

export const getAllPosts = async () => {
  const posts = await Post.find().sort({ createdAt: -1 });
  return posts;
};

export const getPostById = async (id: string) => {
  const post = await Post.findById(id);
  if (!post) {
    const error: ServiceError = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }
  return post;
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

  return post;
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
  return post;
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
