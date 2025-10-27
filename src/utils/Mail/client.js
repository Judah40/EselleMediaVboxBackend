// utils/mail/client.js
const nodemailer = require("nodemailer");
const { emailUser, emailPass } = require("../../config/default.config");

exports.mailClient = () => {
  console.log(emailUser, emailPass);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 456,
    secure: true, // Use TLS
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 30000, // 30 seconds
    // Add debug information
    debug: process.env.NODE_ENV === "development",
    logger: process.env.NODE_ENV === "development",
  });

  return transporter;
};
