const { validationResult } = require("express-validator");
const authService = require("../services/auth.service");

exports.register = async (req, res) => {
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
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  res.json({ message: "Login endpoint" });
};
