const { Match } = require("../../models/match.model");
const { uploadFile, getFileUrl } = require("../../services/supabase");

exports.saveLiveDetails = async ({
  streamName,
  title,
  description,
  banner,
}) => {
  const { path } = await uploadFile(banner.buffer, banner.mimetype, "live/");

  if (!path) {
    throw new Error("COULD NOT UPLOAD BANNER");
  }

  return await Match.create({
    streamName,
    title,
    description,
    banner: path,
  });
};

exports.getLiveDetailsById = async (streamId) => {
  const live = await Match.findOne({
    where: {
      streamId,
    },
  });
  if (!live) {
    throw new Error("LIVE STREAM DETAILS NOT FOUND");
  }
  return live;
};

exports.getAllActiveLiveStream = async () => {
  const LiveDetails = await Match.findAll({
    where: {
      isLive: true,
    },
  });

  const liveStreams = LiveDetails.map(async (live) => {
    const bannerUrl = await getFileUrl(live.banner);
    return {
      streamName: live.streamName,
      title: live.title,
      description: live.description,
      streamId: live.streamId,
      banner: bannerUrl,
      isLive: live.isLive,
    };
  });
  return liveStreams;
};
