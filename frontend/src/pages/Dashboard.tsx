import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Link, CardContent, Card } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "../components/LikeButton";
import { getPosts } from "../api/models/post";
import { Post } from "../models/Post";
import CommentIcon from '@mui/icons-material/Comment';

export const Dashboard = () => {
    const { user, isLoggedIn, token } = useAuth();
    const safeToken = typeof token === "string" && token.trim() ? token : undefined;

    const [boardPosts, setBoardPosts] = useState<Post[]>([]);
    const [posts] = usePosts({
      token: isLoggedIn ? safeToken : undefined,
    });
    const navigate = useNavigate();

    const reloadDashboard = async () => {
        try {
            const res = await getPosts({
                token: safeToken,
            });
            setBoardPosts(res.posts ?? []);
        } catch (error) {
            console.error("Error loading post:", error);
        }
    };

    useEffect(() => {
      if (posts.length > 0 && boardPosts.length === 0) {
        setBoardPosts(posts);
      }
    }, [posts, boardPosts]);
      
    return(
      <Box p={3} maxWidth="700px" mx="auto">
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography variant="h6" gutterBottom>Welcome {user?.username}</Typography>
      <Stack spacing={2}>
          {boardPosts.map((post) => (
              <Card key={post?.id}>
              <CardContent>
                <Stack spacing={1} mx={6}>
                  <Link
                    onClick={() => navigate(`/post/${post.id}`)}
                    variant="h6"
                    underline="hover"
                    sx={{ cursor: 'pointer' }}
                  >
                    {post.title}
                  </Link>
            
                  <Typography variant="caption" color="text.secondary">
                    Posted by: {post.author?.username}
                  </Typography>
            
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {post.content}
                  </Typography>
            
                  <Stack direction="row" alignItems="center" spacing={1}>
                            <LikeButton
                            key={post.id + String(post.likedByCurrentUser)}
                            target={post}
                            targetType={'post'}
                            onLikeToggled={reloadDashboard}
                            readonly={false}
                            />
                            <CommentIcon fontSize="medium" color="disabled"></CommentIcon>
                            <Typography>{post.comment_count}</Typography>                           
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
            </Stack>
        </Box>
    );
};