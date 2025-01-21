require("dotenv").config(); // Load environment variables
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
      from: '"Inkspresso" <noreply@inkspresso.com>', // Sender email
      to: "acechianni@gmail.com", // Replace with a valid email for testing
      subject: "Test Email",
      text: "This is a test email sent from Mailtrap!",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Test email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending test email:", error);
  }
};

// Call the test function
testMailtrapEmail();
