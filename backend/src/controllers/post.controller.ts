import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import * as postService from "../services/post.service";
import { ServiceError } from "../services/auth.service";

export const getPosts = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const posts = await postService.getAllPosts();
    return res.status(200).json({ posts });
  } catch (error) {
    const err = error as ServiceError;
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getPost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id as string;
    const post = await postService.getPostById(id);
    return res.status(200).json(post);
  } catch (error) {
    const err = error as ServiceError;
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Error fetching post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createPost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { title, content } = req.body;
    const post = await postService.createPost({
      title,
      content,
      user: req.user,
    });
    return res.status(201).json({ message: "Post created", post });
  } catch (error) {
    const err = error as ServiceError;
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const id = req.params.id as string;
    const { title, content } = req.body;
    const post = await postService.updatePost(id, {
      title,
      content,
      user: req.user,
    });
    return res.status(200).json({ message: "Post updated", post });
  } catch (error) {
    const err = error as ServiceError;
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Error updating post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const id = req.params.id as string;
    const result = await postService.deletePost(id, req.user);
    return res.status(200).json(result);
  } catch (error) {
    const err = error as ServiceError;
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
