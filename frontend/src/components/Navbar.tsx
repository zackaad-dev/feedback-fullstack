import React from "react";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    return(
        <AppBar color="inherit" position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" color="primary"  onClick={() => navigate("/")}>Nest</Typography>
                <Box>
                    {isLoggedIn ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Link onClick={() => navigate("/create")} variant="h6">Create Post</Link>
                        <Link onClick={() => navigate("/profile")} variant="h6">Profile</Link>
                        <Box>
                            <Button variant="contained" onClick={() => { logout(); navigate("/login");}}>Logout</Button>
                        </Box>
                    </Box>
                    ) : (
                        <Box>
                            <Button variant="contained" onClick={() => navigate("/login")}>
                                Login
                            </Button>
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};