const { mediaPackage } = require("../../config/aws.config");

exports.createMediaPackageEndpoint = async (channelId) => {
  const endpointParams = {
    ChannelId: channelId,
    Id: `${channelId}-endpoint`,
    Description: `${channelId} Origin Endpoint`,
    ManifestName: "index",
    StartoverWindowSeconds: 0,
    TimeDelaySeconds: 0,
    HlsPackage: {
      SegmentDurationSeconds: 6,
      PlaylistWindowSeconds: 60,
      IncludeIframeOnlyStream: false,
      UseAudioRenditionGroup: false,
    },
  };
  const endpoint = await mediaPackage
    .createOriginEndpoint(endpointParams)
    .promise();
  return endpoint;
};
