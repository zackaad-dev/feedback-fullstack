import React, { useCallback, useEffect, useState } from "react";
import { CardContent, Container, Typography, Card, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Post } from "../models/Post";
import { getPosts } from "../api/models/post";
import { LikeButton } from "../components/LikeButton";
import { CommentSection } from "../components/CommentSection";

export const PostDetail = () => {
    const { postId } = useParams();
    const { token } = useAuth();

    const [post, setPost] = useState<Post | null>(null);

    const reloadPost = useCallback(async () => {
        if (!postId) return;

        const cleanToken = typeof token === "string" && token.trim() ? token : undefined;
    
        try {

          const res = await getPosts({
            query: { postId },
            ...(cleanToken ? { token: cleanToken } : {}),
          });
          
          setPost(res.posts?.[0] ?? null);
        } catch (error) {
          console.error("Error loading post:", error);
        }
      }, [postId, token]);
    
      useEffect(() => {
        reloadPost();
      }, [reloadPost]);
    
    return(
        <Container maxWidth="md" sx={{ mt: 4 }}>
        <Stack spacing={2}>
            <Card>
                <CardContent>
                    <Stack mx={4} my={4}>
                        <Typography variant="h4" >{post?.title}</Typography>
                        <Typography variant="body2" >Posted by: {post?.author?.username}</Typography>
                        <Typography variant="body2" mt={2}>{post?.content}</Typography>
                            {post && (
                            <LikeButton
                            target={post}
                            targetType="post"
                            readonly={false}
                            onLikeToggled={reloadPost}
                            />)}
                            {postId && 
                            <CommentSection 
                            postId={postId}
                            />}
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    );
};