const { medialLive } = require("../../config/aws.config");

/**
 * @description This service creates a security group for the MediaLive input
 * @returns {string} - The security group ID
 * @throws {Error} - Throws error if the security group is not created
 * @async
 */
exports.createSecurityGroup = async () => {
  const params = {
    WhitelistRules: [{ Cidr: "0.0.0.0/0" }],
  };
  try {
    const data = await medialLive.createInputSecurityGroup(params).promise();
    console.log("Security Group created successfully:", data.SecurityGroup);
    return data.SecurityGroup.Id;
  } catch (error) {
    console.error("Error creating security group:", error);
    throw new Error("Failed to create security group");
  }
};
