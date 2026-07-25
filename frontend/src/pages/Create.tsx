import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert, Card, CardContent } from "@mui/material";
import { createpost } from "../api/models/post";
import { useAuth } from "../context/AuthContext";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { token, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isLoggedIn || typeof token !== "string" || !token.trim()) {
      setError("You must be logged in to create a post.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await createpost({ title, content }, token);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Post creation error:", err);
      setError(err?.response?.data?.error || "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, letterSpacing: "-0.02em" }}>
          Create a Post
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>{error}</Alert>}

        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Post Title"
                required
                fullWidth
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="What's on your mind?"
              />
              <TextField
                label="Content"
                required
                multiline
                minRows={6}
                fullWidth
                value={content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                placeholder="Write your thoughts..."
              />
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" color="inherit" onClick={() => navigate("/dashboard")}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading || !title.trim() || !content.trim()}
                >
                  {loading ? "Posting..." : "Post"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};