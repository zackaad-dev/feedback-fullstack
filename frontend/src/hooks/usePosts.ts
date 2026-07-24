import { useEffect, useState } from "react";
import type { Post } from "../models/Post";
import { getPosts } from "../api/models/post";

export const usePosts = ({ token }: { token?: string } = {}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts({ token })
      .then((res: { posts?: Post[] }) => {
        if (res?.posts) setPosts(res.posts);
      })
      .catch((err: unknown) => console.error("Error fetching posts:", err));
  }, [token]);

  return [posts, setPosts] as const;
};
