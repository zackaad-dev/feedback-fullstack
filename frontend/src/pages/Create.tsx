import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
  } from "@mui/material";
import { createpost } from "../api/models/post";
import { useAuth } from "../context/AuthContext";

export const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
          if (typeof token === "string" && token.trim()) {
            await createpost({ title, content }, token);
            navigate("/dashboard");
          } else {
            console.error("You need to be logged in to create a post");
            alert("You need to be logged in to create a post");
          }
        } catch (error) {
          console.error("Post creation error:", error);
          alert("Failed to create post. Please try again.");
        }
      };

    return(
        <Box display="flex" flexDirection="row" gap={4} p={4} maxWidth="1000px" mx="auto">
        {/* Main Form */}
        <Box flex={2}>
            <Typography variant="h5" gutterBottom>
            Create Post
            </Typography>

            <Box component="form" display="flex" flexDirection="column" gap={2}>
            <TextField label="Title" required fullWidth onChange={(e) => setTitle(e.target.value)} />
            <TextField
                label="Content"
                required
                multiline
                minRows={8}
                fullWidth
                onChange={(e) => setContent(e.target.value)} 
            />
            </Box>
        </Box>

        {/* Side Panel */}
        <Box flex={1} display="flex" flexDirection="column" gap={2}>
            <Card>
            <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                Featured Image
                </Typography>
                <Box
                sx={{
                    border: "2px dashed #ccc",
                    padding: 2,
                    textAlign: "center",
                    cursor: "pointer",
                }}
                >
                Drag & drop your files or <span style={{ color: "#ff6f00" }}>Browse</span>
                </Box>
            </CardContent>
            </Card>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
            </Button>
        </Box>
        </Box>
  );
};