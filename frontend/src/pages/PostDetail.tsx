import { useCallback, useEffect, useState } from "react";
import { Box, CardContent, Typography, Card, Stack, Avatar, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Post } from "../models/Post";
import { getPosts } from "../api/models/post";
import { LikeButton } from "../components/LikeButton";
import { CommentSection } from "../components/CommentSection";

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const reloadPost = useCallback(async () => {
    if (!id) return;
    const cleanToken = typeof token === "string" && token.trim() ? token : undefined;

    try {
      setLoading(true);
      const res = await getPosts({
        query: { id },
        ...(cleanToken ? { token: cleanToken } : {}),
      });

      const foundPost = res.posts?.find((p: Post) => p.id === id) || res.posts?.[0] || null;
      setPost(foundPost);
    } catch (error) {
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    reloadPost();
  }, [reloadPost]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, sm: 4 },
        py: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "720px" }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Button
            size="small"
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/dashboard")}
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Back to Feed
          </Button>
        </Box>

        {loading ? (
          <Typography color="text.secondary">Loading post...</Typography>
        ) : !post ? (
          <Typography color="text.secondary">Post not found.</Typography>
        ) : (
          <Stack spacing={3}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
                  <Avatar sx={{ bgcolor: "text.primary", color: "background.paper", fontWeight: 800, width: 42, height: 42 }}>
                    {post.author?.username ? post.author.username[0].toUpperCase() : "U"}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                      {post.author?.username || "Anonymous"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      @{post.author?.username || "user"} • {new Date(post.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.02em" }}>
                  {post.title}
                </Typography>

                <Typography variant="body1" color="text.primary" sx={{ whiteSpace: "pre-wrap", mb: 3, lineHeight: 1.6 }}>
                  {post.content}
                </Typography>

                <Box sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}>
                  <LikeButton
                    target={post}
                    targetType="post"
                    readonly={false}
                    onLikeToggled={reloadPost}
                  />
                </Box>
              </CardContent>
            </Card>

            {id && <CommentSection postId={id} />}
          </Stack>
        )}
      </Box>
    </Box>
  );
};