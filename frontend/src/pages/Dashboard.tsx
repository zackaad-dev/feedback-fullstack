import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "../components/LikeButton";
import { getPosts } from "../api/models/post";
import type { Post } from "../models/Post";
import CommentIcon from "@mui/icons-material/Comment";

export const Dashboard = () => {
  const { user, isLoggedIn, token } = useAuth();
  const safeToken =
    typeof token === "string" && token.trim() ? token : undefined;

  const [boardPosts, setBoardPosts] = useState<Post[]>([]);
  const [posts] = usePosts({
    token: isLoggedIn ? safeToken : undefined,
  });
  const navigate = useNavigate();

  const reloadDashboard = useCallback(async () => {
    try {
      const res = await getPosts({
        token: safeToken,
      });
      setBoardPosts(res.posts ?? []);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }, [safeToken]);

  useEffect(() => {
    if (posts.length > 0 && boardPosts.length === 0) {
      setBoardPosts(posts);
    }
  }, [posts, boardPosts]);

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
        <Box sx={{ pb: 2, mb: 3, borderBottom: 1, borderColor: "divider" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            Home Feed
          </Typography>
          {isLoggedIn && user?.username && (
            <Typography variant="body2" color="text.secondary">
              Welcome back, @{user.username}
            </Typography>
          )}
        </Box>

        <Stack spacing={2}>
          {boardPosts.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                No posts yet
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Be the first to share your feedback or start a discussion!
              </Typography>
              {isLoggedIn && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/create")}
                >
                  Create a Post
                </Button>
              )}
            </Box>
          ) : (
            boardPosts.map((post) => (
              <Card
                key={post.id}
                sx={{
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{
                        bgcolor: "text.primary",
                        color: "background.paper",
                        fontWeight: 800,
                        width: 38,
                        height: 38,
                      }}
                    >
                      {post.author?.username
                        ? post.author.username[0].toUpperCase()
                        : "U"}
                    </Avatar>

                    <Box flex={1}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={0.5}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700 }}
                        >
                          {post.author?.username || "Anonymous"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          @{post.author?.username || "user"}
                        </Typography>
                        {post.createdAt && (
                          <Typography variant="caption" color="text.secondary">
                            • {new Date(post.createdAt).toLocaleDateString()}
                          </Typography>
                        )}
                      </Stack>

                      <Typography
                        variant="h6"
                        onClick={() => navigate(`/post/${post.id}`)}
                        sx={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          mb: 1,
                          lineHeight: 1.3,
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                          whiteSpace: "pre-wrap",
                          mb: 2,
                          lineHeight: 1.55,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {post.content}
                      </Typography>

                      <Stack direction="row" alignItems="center" spacing={3}>
                        <LikeButton
                          key={post.id + String(post.likedByCurrentUser)}
                          target={post}
                          targetType="post"
                          onLikeToggled={reloadDashboard}
                          readonly={false}
                        />

                        <Button
                          size="small"
                          color="inherit"
                          startIcon={<CommentIcon fontSize="small" />}
                          onClick={() => navigate(`/post/${post.id}`)}
                          sx={{
                            color: "text.secondary",
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
                          {post.comment_count || 0}
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Box>
    </Box>
  );
};
