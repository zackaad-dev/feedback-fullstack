import React, { useCallback, useEffect, useState } from "react";
import { Comment } from "../models/Comment";
import { Typography, Stack, Paper, TextField, Button, Box } from "@mui/material";
import { useComments } from "../hooks/useComments";
import { useAuth } from "../context/AuthContext";
import { createComment } from "../api/models/comment";
import { getPostComments } from "../api/models/post";
import { LikeButton } from "./LikeButton";

interface CommentSectionProps {
    postId: string;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
    const { token, isLoggedIn } = useAuth();

    const safeToken = typeof token === "string" && token.trim() && token !== "null" ? token : undefined;

    const [comments] = useComments(postId, safeToken);
    const [postComments, setPostComments] = useState<Comment[]>([]);
    const [content, setContent] = useState('');

    const reloadComments = useCallback(async () => {
        if (!postId) return;
        try {
            const res = await getPostComments(postId, safeToken);
            setPostComments(res.comments);
        } catch (error) {
            console.error("Error loading post:", error);
        }
    }, [postId, safeToken]);

    const handleSubmit = async () => {
        try {
            if (typeof token === "string" && token.trim()) {
                await createComment({postId: postId, content: content }, token);
                setContent('');
                await reloadComments();        
            } else {
                console.log('You need to be logged in to create a post');
                return;
            }

        } catch (error) {
            console.error('Error posting comment', error);
            alert('Failed to post commment. Please try again');
        }
    };

    useEffect(() => {
        reloadComments();
    }, [reloadComments]);

    return(
        <Stack spacing={2} mt={4}>
            <Typography variant="h6">Comments</Typography>
            <Box>
                {isLoggedIn ? (
                    <Stack direction="row" alignItems="center">
                        <TextField
                        value={content}
                        fullWidth
                        size="small"
                        placeholder="Write a comment..."
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSubmit();
                        }}
                        />
                        <Button variant="contained" onClick={handleSubmit} disabled={!content.trim()}>Send</Button>
                </Stack>
                ): (
                <Stack>
                    <Typography>Log in to comment this post</Typography>
                </Stack>
                )}
            </Box>
            {comments.length > 0 ? (
                postComments.map((comment) => (
                <Paper
                    key={comment.id}
                    elevation={0}
                    sx={{
                    borderRadius: 2,
                    p: 0,
                    }}
                >
                    <Stack px={1}>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>@{comment.author.username}</strong>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" my={2}>
                                {new Date(comment.createdAt).toLocaleString()}
                            </Typography>
                        </Stack>
                        <Typography ml={1}>
                            {comment.content}
                        </Typography>
                            <LikeButton
                            target={comment}
                            targetType="comment"
                            onLikeToggled={reloadComments}
                            readonly={false}
                            />
                    </Stack>
                </Paper>
                ))
            ) : (
                <Typography color="text.secondary">No comments yet.</Typography>
            )}
        </Stack>
    );
};