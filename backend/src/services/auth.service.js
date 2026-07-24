const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already in use");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({
    username,
    email,
    password_hash: password,
  });

  return {
    id: user.uid,
    email: user.email,
    username: user.username,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
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
      id: user.uid,
      email: user.email,
      username: user.username,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};