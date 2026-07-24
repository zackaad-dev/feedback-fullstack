import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Link, Typography, Button } from "@mui/material";
import { NestCard } from "../components/Card";
import { signin } from "../api/models/auth";
import { useAuth } from "../context/AuthContext";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await signin({ email, password });
            login(response.token, response.user);
            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);
            alert("Invalid credentials");
        }
    };
    
    return(
        <NestCard>
            <Typography variant="h4" align="center" fontWeight="bold">Sign in</Typography>
                <TextField value={email} label="Email" onChange={(e) => setEmail(e.target.value)} />
                <TextField value={password} label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" onClick={handleLogin}>Login</Button>
                <Typography variant="body2" align="center">
                Dont have an account?{" "}
                    <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        navigate('/register')
                      }}
                    >
                    Sign up here
                    </Link>
                </Typography>
        </NestCard>
    )
}