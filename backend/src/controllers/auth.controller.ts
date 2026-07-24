import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as authService from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;
    const user = await authService.registerUser({ username, email, password });

    return res.status(201).json({
      message: "User registered",
      user,
    });
  } catch (error) {
    const err = error as authService.ServiceError;
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });

    return res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    const err = error as authService.ServiceError;
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
