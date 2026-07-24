import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Alert, Divider } from "@mui/material";
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
      <Box textAlign="center" mb={0.5}>
        <Box
          component="img"
          src="/favicon.svg"
          alt="Logo"
          sx={{ width: 36, height: 36, mb: 1.5 }}
        />
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Create your account
        </Typography>
      </Box>

      <Box sx={{ my: 0.5 }}>
        <Divider sx={{ "&::before, &::after": { borderColor: "divider" } }}>
          <Typography variant="body2" color="text.secondary">
            or
          </Typography>
        </Divider>
      </Box>

      {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleRegister} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          value={username}
          placeholder="Username"
          required
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />
        <TextField
          value={email}
          placeholder="Email address"
          type="email"
          required
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <TextField
          value={password}
          placeholder="Password"
          type="password"
          required
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={loading}
          sx={{
            py: 1.4,
            borderRadius: 9999,
            fontWeight: 700,
            fontSize: "0.95rem",
          }}
        >
          {loading ? "Creating account..." : "Continue"}
        </Button>
      </Box>

      <Typography variant="caption" align="center" color="text.secondary" sx={{ display: "block", mt: 1, lineHeight: 1.4 }}>
        By continuing, you agree to our{" "}
        <Typography component="span" variant="caption" sx={{ fontWeight: 700, color: "text.primary" }}>
          Terms of Service
        </Typography>
        ,{" "}
        <Typography component="span" variant="caption" sx={{ fontWeight: 700, color: "text.primary" }}>
          Privacy Policy
        </Typography>{" "}
        and{" "}
        <Typography component="span" variant="caption" sx={{ fontWeight: 700, color: "text.primary" }}>
          Cookie Use
        </Typography>
        .
      </Typography>

      <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
        Already have an account?{" "}
        <Typography
          component="span"
          variant="body2"
          onClick={() => navigate("/login")}
          sx={{ fontWeight: 700, color: "text.primary", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
        >
          Log in
        </Typography>
      </Typography>
    </NestCard>
  );
};