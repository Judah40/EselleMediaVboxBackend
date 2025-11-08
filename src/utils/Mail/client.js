// utils/mail/client.js
const formData = require("form-data");
const mailgun = require("mailgun.js");
const mailGun = new mailgun(formData);
const { mailGunApiKey } = require("../../config/default.config");

exports.mailClient = mailGun.client({
  username: "api",
  key: mailGunApiKey,
});
