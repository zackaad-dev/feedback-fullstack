import React, { useCallback, useEffect, useState } from "react";
import type { Comment } from "../models/Comment";
import { Typography, Stack, Card, CardContent, TextField, Button, Box, Avatar } from "@mui/material";
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
  const [content, setContent] = useState("");

  const reloadComments = useCallback(async () => {
    if (!postId) return;
    try {
      const res = await getPostComments(postId, safeToken);
      if (res?.comments) setPostComments(res.comments);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  }, [postId, safeToken]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      if (typeof token === "string" && token.trim()) {
        await createComment({ postId, content }, token);
        setContent("");
        await reloadComments();
      }
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  useEffect(() => {
    reloadComments();
  }, [reloadComments]);

  const displayedComments = postComments.length > 0 ? postComments : comments;

  return (
    <Stack spacing={2} mt={3}>
      <Typography variant="h6" sx={{ fontWeight: 800 }}>
        Replies
      </Typography>

      {isLoggedIn ? (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <TextField
            value={content}
            fullWidth
            size="small"
            placeholder="Post your reply"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!content.trim()}>
            Reply
          </Button>
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Log in to leave a reply on this post.
        </Typography>
      )}

      {displayedComments.length > 0 ? (
        displayedComments.map((comment) => (
          <Card key={comment.id} sx={{ backgroundColor: "background.paper" }}>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: "0.875rem", fontWeight: 700 }}>
                  {comment.author?.username ? comment.author.username[0].toUpperCase() : "U"}
                </Avatar>
                <Box flex={1}>
                  <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      @{comment.author?.username || "anonymous"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      • {new Date(comment.createdAt).toLocaleDateString()}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ mb: 1.5, lineHeight: 1.5 }}>
                    {comment.content}
                  </Typography>
                  <LikeButton
                    target={comment}
                    targetType="comment"
                    onLikeToggled={reloadComments}
                    readonly={false}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" py={2}>
          No replies yet.
        </Typography>
      )}
    </Stack>
  );
};