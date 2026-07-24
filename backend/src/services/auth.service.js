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

module.exports = {
  registerUser,
};
