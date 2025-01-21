// backend/routes/authRoutes.js

// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const crypto = require("crypto");
// const dotenv = require("dotenv");

// dotenv.config();

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyEmail,
  resetPasswordRequest,
  resetPassword,
} = require("../controllers/authController");

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Verify Email
router.get("/verify/:token", verifyEmail);

// Password Reset Request (username or email)
router.post("/reset-password-request", resetPasswordRequest);

// Reset Password
router.post("/reset-password/:token", resetPassword);

module.exports = router;
