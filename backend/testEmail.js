// testEmail.js
const { sendEmail } = require("./utils/emailUtils");
require("dotenv").config();

const testSendEmail = async () => {
  const testEmail = "acechianni@gmail.com"; // Replace with any email to test
  const subject = "Test Email from Mailtrap";
  const text = "This is a test email sent via Mailtrap.";

  try {
    await sendEmail(testEmail, subject, text);
    console.log("Test email sent successfully!");
  } catch (error) {
    console.error("Test email failed:", error);
  }
};

testSendEmail(); // Execute the function
