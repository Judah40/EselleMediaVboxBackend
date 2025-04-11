const { medialLive } = require("../../config/aws.config");

/**
 * @description This service fetches the security group for the MediaLive input
 * @returns {string} - The security group ID
 * @throws {Error} - Throws error if the security group is not found
 * @async
 */
exports.fetchSecurityGroup = async () => {
  try {
    const data = await medialLive.listInputSecurityGroups().promise();
    console.log("Security Group fetched successfully:", data);

    if (!data.InputSecurityGroups || data.InputSecurityGroups.length === 0) {
      return null;
    }
    return data.InputSecurityGroups[0].Id;
  } catch (error) {
    console.error("Error fetching security group:", error);
    throw new Error("Failed to fetch security group");
  }
};
