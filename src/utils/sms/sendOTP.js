const { TwilioClient } = require("../../config/twilio.config");
const request = require("request")
async function sendOTP(phoneNumber, otp) {
  try {
    const message = await TwilioClient.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: "+19418776485", // Replace with your Twilio phone number
      to: phoneNumber,
    });

    console.log(`OTP sent successfully to ${phoneNumber}`);
    return message;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

module.exports = sendOTP;
