import { useEffect, useState } from "react";
import type { Comment } from "../models/Comment";
import { getPostComments } from "../api/models/post";

export const useComments = (postId: string, token?: string) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!postId) return;
    getPostComments(postId, token)
      .then((res: { comments?: Comment[] }) => {
        if (res?.comments) setComments(res.comments);
      })
      .catch((err: unknown) => console.error("Error fetching comments:", err));
  }, [postId, token]);

  return [comments, setComments] as const;
};
