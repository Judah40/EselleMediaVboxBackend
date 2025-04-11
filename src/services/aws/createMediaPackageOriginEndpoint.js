const { mediaPackage } = require("../../config/aws.config");

/**
 * @description This create origin endpoint for media package
 * @returns {string} - origin endpoint
 * @throws {Error} - Throws error if origin endpoint is not created
 * @async
 */
exports.createOriginEndpoint = async (originId, channelId) => {
  const input = {
    Id: originId,
    ChannelId: channelId,
    ManifestName: "index",
    Origination: "ALLOW",
    HlsPackage: { SegmentDurationSeconds: 6 },
  };

  try {
    const response = await mediaPackage.createOriginEndpoint(input).promise();
    return response;
  } catch (error) {
    throw error;
  }
};
