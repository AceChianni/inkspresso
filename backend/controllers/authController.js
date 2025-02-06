// backend/controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/emailUtils");
const bcrypt = require("bcryptjs");

// Register User with Email Verification
const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  // Validate all fields
  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Generate a verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");
    user.verificationToken = verificationToken;
    user.verificationTokenExpiration = Date.now() + 3600000; // 1 hour expiration

    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      message: "User registered. Please verify your email.",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

// Resend Verification Email
const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    // Generate a new verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");
    user.verificationToken = verificationToken;
    user.verificationTokenExpiration = Date.now() + 3600000; // 1 hour expiration

    await user.save();

    // Send the verification email
    await sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({ message: "Verification email resent." });
  } catch (error) {
    console.error("Error while resending verification email:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token." });
    }

    if (Date.now() > user.verificationTokenExpiration) {
      return res.status(400).json({ message: "Verification token expired" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiration = undefined; // Clear expiration
    await user.save();

    res.status(200).json({ message: "Account verified successfully." });
  } catch (error) {
    console.error("Error during email verification:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

// Login User with username or email
const loginUser = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  // Validate input
  if (!usernameOrEmail || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email/username and password" });
  }

  try {
    let user;
    if (usernameOrEmail.includes("@")) {
      user = await User.findOne({ email: usernameOrEmail });
    } else {
      user = await User.findOne({ username: usernameOrEmail });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Account not verified. Please check your email." });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

// Password Reset Request with Username or Email
const resetPasswordRequest = async (req, res) => {
  const { identifier } = req.body;

  try {
    // Find user by username or email
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate reset token and set expiration
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Create the reset URL
    const resetUrl = `http://localhost:5001/api/auth/reset-password/${resetToken}`;
    const subject = "Password Reset Request";
    const text = `Hi ${user.name},\n\nTo reset your password, please click the following link:\n\n${resetUrl}\n\nIf you didn't request this, you can ignore this email.`;

    await sendVerificationEmail(user.email, subject, text);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("Error during password reset request:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token." });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error during password reset:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

// Update user to admin
const makeAdmin = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = true;
    await user.save();

    res.status(200).json({ message: "User updated to admin", user });
  } catch (error) {
    console.error("Error updating user to admin:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  resetPasswordRequest,
  resetPassword,
  makeAdmin,
  getUsers,
};
