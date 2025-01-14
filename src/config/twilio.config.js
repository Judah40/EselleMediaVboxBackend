const twilio = require("twilio");
const { accountSid, authToken } = require("./default.config");

const TwilioClient = new twilio(accountSid, authToken);

module.exports = {TwilioClient};
