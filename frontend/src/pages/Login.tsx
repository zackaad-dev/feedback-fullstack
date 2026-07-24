import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Link, Typography, Button, Box, Alert } from "@mui/material";
import { NestCard } from "../components/Card";
import { signin } from "../api/models/auth";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await signin({ email, password });
      login(response.token, response.user);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NestCard>
      <Box textAlign="center" mb={1}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            bgcolor: "text.primary",
            color: "background.paper",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 22,
            mb: 1.5,
          }}
        >
          F
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Sign in to Feedback
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          value={email}
          label="Email"
          type="email"
          required
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <TextField
          value={password}
          label="Password"
          type="password"
          required
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" size="large" type="submit" disabled={loading} sx={{ py: 1.2 }}>
          {loading ? "Signing in..." : "Log in"}
        </Button>
      </Box>

      <Typography variant="body2" align="center" color="text.secondary">
        Don't have an account?{" "}
        <Link
          component="button"
          variant="body2"
          underline="hover"
          onClick={() => navigate("/register")}
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          Sign up
        </Link>
      </Typography>
    </NestCard>
  );
};