import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Link, Typography, Box, Alert } from "@mui/material";
import { NestCard } from "../components/Card";
import { signup } from "../api/models/auth";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signup({ email, username, password });
      if (!result) {
        setError("Signup failed. Please try again.");
        return;
      }
      navigate("/login");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err?.response?.data?.error || "Signup failed. Check your inputs.");
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
          Create your account
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleRegister} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          value={username}
          label="Username"
          required
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />
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
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </Box>

      <Typography variant="body2" align="center" color="text.secondary">
        Already have an account?{" "}
        <Link
          component="button"
          variant="body2"
          underline="hover"
          onClick={() => navigate("/login")}
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          Log in
        </Link>
      </Typography>
    </NestCard>
  );
};