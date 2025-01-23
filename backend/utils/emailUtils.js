// backend/utils/emailUtils.js

require("dotenv").config();
const nodemailer = require("nodemailer");

// Gmail Transporter (for production)
const gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Mailtrap Transporter (for testing purposes)
const mailtrapTransporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Default transporter selection (Mailtrap for testing, Gmail for production)
const transporter =
  process.env.NODE_ENV === "production"
    ? gmailTransporter
    : mailtrapTransporter;

// Email sending function
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "Inkspresso <noreply@inkspresso.com>",
    to, // Sends email to the dynamic email address
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error(`Email send failed: ${error.message}`);
  }
};

// Send verification email helper
const sendVerificationEmail = async (userEmail, token) => {
  const verificationUrl = `http://localhost:5001/api/auth/verify/${token}`;
  const subject = "Account Verification";
  const text = `Please verify your email by clicking on the following link: ${verificationUrl}`;

  await sendEmail(userEmail, subject, text);
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
};
