// backend/routes/authRoutes.js
const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  resetPasswordRequest,
  resetPassword,
  makeAdmin,
  getUsers,
} = require("../controllers/authController");

const router = express.Router();

// Register User
router.post("/signup", registerUser);

// Login User
router.post("/login", loginUser);

// Verify Email
router.get("/verify/:token", verifyEmail);

// Resend Verification Email (route for resending the verification email)
router.post("/resend-verification", resendVerificationEmail);

// Password Reset Request (username or email)
router.post("/reset-password-request", resetPasswordRequest);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// Make a user admin (Admin-only route)
router.put("/make-admin/:userId", protect, admin, makeAdmin);

// Route to get all users (requires admin access)
router.get("/users", protect, admin, getUsers);

module.exports = router;
