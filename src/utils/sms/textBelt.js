// const { default: axios } = require("axios");

// async function sendSMS(phoneNumber, message) {
//   try {
//     const response = await axios.post("https://textbelt.com/text", {
//       phone: phoneNumber, // Use E.164 format, e.g., "+1234567890"
//       message: message,
//       key: "textbelt", // Free API key
//     });

//     console.log("Response:", response.data);
//     if (response.data.success) {
//       console.log("Message sent successfully!");
//     } else {
//       console.error("Failed to send message:", response.data.error);
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// }

// module.exports = {sendSMS};
