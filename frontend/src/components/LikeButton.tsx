import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../context/AuthContext";
import type { Post } from "../models/Post";
import { toggleLike } from "../api/models/like";
import type { Comment } from "../models/Comment";

interface LikeButtonProps {
  target: Post | Comment;
  targetType: "post" | "comment";
  onLikeToggled?: () => void;
  readonly?: boolean;
}

export const LikeButton = ({
  target,
  onLikeToggled,
  targetType,
  readonly = false,
}: LikeButtonProps) => {
  const { token, isLoggedIn } = useAuth();

  const isLiked = Boolean(target.likedByCurrentUser);

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token || readonly || !isLoggedIn) return;
    try {
      await toggleLike(target.id, targetType, token);
      if (onLikeToggled) onLikeToggled();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Box
      onClick={handleToggleLike}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        cursor: isLoggedIn && !readonly ? "pointer" : "default",
        userSelect: "none",
        color: isLiked ? "#E0245E" : "text.secondary",
        "&:hover": {
          color: isLiked ? "#E0245E" : "text.primary",
        },
      }}
    >
      <IconButton
        disabled={!isLoggedIn || readonly}
        size="small"
        sx={{
          p: 0,
          color: isLiked ? "#E0245E" : "inherit",
          "&.Mui-disabled": {
            color: isLiked ? "#E0245E" : "inherit",
          },
        }}
      >
        {isLiked ? (
          <FavoriteIcon sx={{ fontSize: 18, color: "#E0245E" }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 18 }} />
        )}
      </IconButton>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          fontSize: "0.875rem",
          lineHeight: 1,
          color: isLiked ? "#E0245E" : "inherit",
        }}
      >
        {target.likes_count || 0}
      </Typography>
    </Box>
  );
};