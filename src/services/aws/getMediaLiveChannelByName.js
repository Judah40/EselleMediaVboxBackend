const { medialLive } = require("../../config/aws.config");

/**
 * @description this service gets media live channel by its name
 * @param {string} name - The name of the input
 * @returns {object} - The media live channel id
 */
exports.handleFetchSingleChannelByName = async (channelName) => {
  try {
    const channels = await medialLive.listChannels().promise();
    const channel = channels.Channels.find((ch) => ch.Name === channelName);
    if (!channel) {
      console.error("MediaLive Input channel not found");
      return null;
    }
    return channel;
  } catch (error) {
    console.error("Error getting channel:", error);
    return null;
  }
};
