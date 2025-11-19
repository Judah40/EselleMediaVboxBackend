const { uploadFile, getFileUrl } = require("../../services/supabase");
const { Channel } = require("../../models/channel.model");
exports.createChannelService = async (
  channelName,
  buffer,
  mimetype,
  userId
) => {
  const { path } = await uploadFile(buffer, mimetype, "channel/");

  if (!path) {
    throw new Error("COULD NOT CREATE CHANNEL");
  }
  await Channel.create({
    channelName,
    channelLogo: path,
    userId,
  });
};

exports.getAllChannelService = async () => {
  const allChannel = await Channel.findAll({});
  const channels = await Promise.all(
    allChannel.map(async (values) => {
      const { channelLogo, channelId, channelName, lastBroadcast, isLive } =
        values;
      const channelLogoUrl = await getFileUrl(channelLogo);
      return {
        channelLogo: channelLogoUrl,
        channelId,
        channelName,
        lastBroadcast,
        isLive,
      };
    })
  );

  return channels;
};
exports.checkIfChannelExist = async (channelId) => {
  const channel = await Channel.findOne({
    where: {
      channelId,
    },
  });
  if (!channel) throw new Error("CHANNEL DOESN'T EXIST");
  return channel;
};
exports.deleteChannelService = async (channelId) => {
  const channel = await this.checkIfChannelExist(channelId);
  await channel.destroy();
};

exports.updateChannelLiveStatusService = async ({ channelId }) => {
  const channel = await this.checkIfChannelExist(channelId);
  channel.isLive = !channel.isLive;
  await channel.save();
};
