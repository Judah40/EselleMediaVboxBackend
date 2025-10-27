const nodemailer = require("nodemailer");
const { emailUser, emailPass } = require("../../config/default.config");

//MAIL CLIENT
exports.mailClient = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  return transporter;
};
