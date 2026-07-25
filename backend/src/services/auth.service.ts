import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export interface RegisterInput {
  username?: string;
  email?: string;
  password?: string;
}

export interface LoginInput {
  email?: string;
  password?: string;
}

export interface AuthResponseUser {
  id: number;
  email: string;
  username: string;
}

export interface ServiceError extends Error {
  statusCode?: number;
}

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterInput): Promise<AuthResponseUser> => {
  const normalizedEmail = email ? email.toLowerCase().trim() : "";
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error: ServiceError = new Error("Email already in use");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({
    username: username ? username.trim() : "",
    email: normalizedEmail,
    password_hash: password,
  });

  return {
    id: user.uid || 0,
    email: user.email,
    username: user.username,
  };
};

export const loginUser = async ({
  email,
  password,
}: LoginInput): Promise<{ token: string; user: AuthResponseUser }> => {
  const normalizedEmail = email ? email.toLowerCase().trim() : "";
  const user = await User.findOne({ email: normalizedEmail });
  if (!user || !password) {
    const error: ServiceError = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const error: ServiceError = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.uid, email: user.email, username: user.username },
    process.env.JWT_SECRET || "dev_secret_change_me",
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user.uid || 0,
      email: user.email,
      username: user.username,
    },
  };
};
