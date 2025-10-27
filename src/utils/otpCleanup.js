// utils/otpCleanup.js
const { Op } = require("sequelize");
const UserModel = require("../models/user.model");
class OTPCleanupService {
  constructor() {
    this.isRunning = false;
  }

  startCleanupJob() {
    // Run every minute to clean expired OTPs
    setInterval(async () => {
      try {
        await this.cleanupExpiredOTPs();
      } catch (error) {
        console.error("OTP cleanup job failed:", error);
      }
    }, 60 * 1000); // Every minute
  }

  async cleanupExpiredOTPs() {
    if (this.isRunning) return;

    this.isRunning = true;
    try {
      const result = await UserModel.update(
        { otp: null, otpExpiresAt: null },
        {
          where: {
            otpExpiresAt: {
              [Op.lt]: new Date(), // Less than current time
            },
            otp: {
              [Op.ne]: null, // OTP is not null
            },
          },
        }
      );

      if (result[0] > 0) {
        console.log(`Cleaned up ${result[0]} expired OTPs`);
      }
    } finally {
      this.isRunning = false;
    }
  }
}

module.exports = new OTPCleanupService();
