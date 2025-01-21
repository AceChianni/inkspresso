// backend/controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Send verification email
const sendVerificationEmail = async (userEmail, token) => {
  const verificationUrl = `http://localhost:5001/api/auth/verify/${token}`;
  const subject = "Account Verification";
  const text = `Please verify your email by clicking on the following link: ${verificationUrl}`;

  await sendEmail(userEmail, subject, text);
};

// Register User with Email Verification
const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }

    const user = new User({ name, username, email, password });

    // Generate a verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");
    user.verificationToken = verificationToken;

    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      message: "User registered. Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Account verified successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User with username or email
const loginUser = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

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

    const isMatch = await user.matchPassword(password);
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
    res.status(500).json({ message: error.message });
  }
};

// Password Reset Request with Username or Email
const resetPasswordRequest = async (req, res) => {
  const { identifier } = req.body; // Accepts either username or email.

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

    await sendEmail(user.email, subject, text);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  resetPasswordRequest,
  resetPassword,
};
