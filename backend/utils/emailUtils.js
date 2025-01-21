// utils/emailUtils.js

const nodemailer = require("nodemailer");

const testMailtrapEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: '"Inkspresso" <noreply@inkspresso.com>',
      to: "test@example.com",
      subject: "Test Email",
      text: "This is a test email sent from Mailtrap!",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Test email sent:", info.response);
  } catch (error) {
    console.error("Error sending test email:", error);
  }
};

module.exports = testMailtrapEmail;
