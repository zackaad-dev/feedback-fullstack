import { IconButton, Typography, Stack } from "@mui/material";
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
  readonly = true,
}: LikeButtonProps) => {
  const { token, isLoggedIn } = useAuth();

  const handleToggleLike = async () => {
    if (!token || readonly || !isLoggedIn) return;
    try {
      await toggleLike(target.id, targetType, token);
      if (onLikeToggled) onLikeToggled();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <IconButton
        onClick={handleToggleLike}
        disabled={!isLoggedIn || readonly}
        size="small"
        sx={{ color: target.likedByCurrentUser ? "text.primary" : "text.secondary" }}
      >
        {target.likedByCurrentUser ? (
          <FavoriteIcon fontSize="small" />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
        {target.likes_count}
      </Typography>
    </Stack>
  );
};