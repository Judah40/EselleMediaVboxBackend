const { emailUser } = require("../../config/default.config");
const { mailClient } = require("./client");

exports.sendOTP = async ({ email, otpCode }) => {
  console.log(otpCode);

  try {
    const mailOptions = {
      from: `Vbox Esselle Media <${emailUser}>`,
      to: email,
      subject: "Verify Your Account - OTP Code",
      text: `Your OTP code is: ${otpCode}. This code will expire in 10 minutes.`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP Verification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f7;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f7; padding: 40px 0;">
            <tr>
              <td align="center">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header with Gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 40px 30px 40px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                        🔐 Verification Code
                      </h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                        Secure your account with this one-time code
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 24px 0; color: #1f2937; font-size: 16px; line-height: 1.6;">
                        Hello there! 👋
                      </p>
                      
                      <p style="margin: 0 0 32px 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
                        We received a request to verify your account. Use the code below to complete your verification:
                      </p>

                      <!-- OTP Code Box -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td align="center" style="padding: 0 0 32px 0;">
                            <div style="background: linear-gradient(135deg, #f0f4ff 0%, #f5f0ff 100%); border: 2px dashed #667eea; border-radius: 12px; padding: 24px; display: inline-block;">
                              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                                Your OTP Code
                              </p>
                              <p style="margin: 0; color: #667eea; font-size: 36px; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                ${otpCode}
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>

                      <!-- Important Info Box -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 8px 0; color: #92400e; font-size: 14px; font-weight: 600;">
                              ⚠️ Important Security Information
                            </p>
                            <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.5;">
                              This code will expire in <strong>10 minutes</strong>. Never share this code with anyone, including Vbox Esselle Media staff.
                            </p>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 0 0 16px 0; color: #4b5563; font-size: 14px; line-height: 1.6;">
                        If you didn't request this code, please ignore this email or contact our support team if you have concerns about your account security.
                      </p>

                      <!-- Support Button -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td align="center" style="padding: 24px 0 0 0;">
                            <a href="mailto:support@vboxesselle.com" style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 14px; font-weight: 600; box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);">
                              Contact Support
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 32px 40px; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 13px; line-height: 1.6; text-align: center;">
                        Best regards,<br>
                        <strong style="color: #1f2937;">The Vbox Esselle Media Team</strong>
                      </p>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td align="center" style="padding: 16px 0 0 0;">
                            <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 12px;">Website</a>
                            <span style="color: #d1d5db;">|</span>
                            <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 12px;">Privacy Policy</a>
                            <span style="color: #d1d5db;">|</span>
                            <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 12px;">Terms of Service</a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 11px; line-height: 1.5; text-align: center;">
                        This email was sent to ${email}. If you received this by mistake, please disregard it.
                        <br><br>
                        © ${new Date().getFullYear()} Vbox Esselle Media. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Bottom Spacing -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px;">
                  <tr>
                    <td style="padding: 24px 20px 0 20px; text-align: center;">
                      <p style="margin: 0; color: #9ca3af; font-size: 11px;">
                        Vbox Esselle Media • Making secure transactions easier
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Get the transporter and send mail
    const transporter = mailClient();
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
