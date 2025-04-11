const { medialLive, mediaPackage } = require("../config/aws.config");
const createCloudFrontDistribution = require("../services/aws/createCloudFrontDistribution");
const {
  createOriginEndpoint,
} = require("../services/aws/createMediaPackageOriginEndpoint");
const {
  getDistributionsForMediaPackage,
} = require("../services/aws/getDistributionsForMediaPackage");
const { v4: uuidv4 } = require("uuid");
const {
  handleFetchSingleChannelByName,
} = require("../services/aws/getMediaLiveChannelByName");
const { ChannelList } = require("../models/channelList.model");

//GET SINGLE LIVE STREAM VIDEO
exports.getSingleLiveStream = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Channel ID is required" });
  }
  try {
    const channelId = await handleFetchSingleChannelByName(id);
    const data = await mediaPackage
      .describeChannel({
        Id: channelId.Destinations[0].MediaPackageSettings[0].ChannelId,
      })
      .promise();

    if (!data) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const results = data.HlsIngest.IngestEndpoints.map((endpoint) => {
      return {
        id: endpoint.Id,
        ...extractDomainAndPath(endpoint.Url), // Extract domain and path
      };
    });

    if (!results) {
      return res.status(404).json({ message: "Channel not found" });
    }
    const OriginEndpoints = await mediaPackage
      .listOriginEndpoints({
        ChannelId: channelId.Destinations[0].MediaPackageSettings[0].ChannelId,
      })
      .promise();

    const OriginChannelId = uuidv4();

    //CHECK IF ORIGIN ENDPOINT EXIST IF NOT CREATE ONE
    if (OriginEndpoints && OriginEndpoints.OriginEndpoints.length === 0) {
      //CREATE CHANNEL ID IF NONE FOUND
      const OriginEndpoint = await createOriginEndpoint(
        OriginChannelId,
        data.Id
      );
      if (!OriginEndpoint) {
        return res
          .status(400)
          .json({ message: "Could not create origin endpoint" });
      }
      //CREATE CLOUDFRONT DISTRIBUTION
      const cloudFrontUrl = await createCloudFrontDistribution(
        OriginEndpoint.Url,
        results[0].id
      );
      return res.status(200).json({
        message: "Channel fetched successfully",
        data: cloudFrontUrl,
      });
    }
    const cloudFrontUrlExist = await getDistributionsForMediaPackage(
      OriginEndpoints.OriginEndpoints[0].Url
    );
    if (cloudFrontUrlExist.length === 0) {
      const cloudFrontUrl = await createCloudFrontDistribution(
        OriginEndpoints[0].Url,
        results[0].id
      );
      return res.status(200).json({
        message: "Channel fetched successfully",
        data: cloudFrontUrl,
      });
    }

    // if (!cloudFrontUrl) {
    //   return res.status(404).json({ message: "Channel not found" });
    // }
    return res.status(200).json({
      message: "Channel fetched successfully",
      data: cloudFrontUrlExist[0],
    });
  } catch (error) {
    next(error);
  }
};

exports.handleGetAllLiveStream = async (req, res, next) => {
  try {
    // Fetch all channels from the ChannelList model
    const channels = await ChannelList.findAll();

    if (!channels || channels.length === 0) {
      return res.status(404).json({
        message: "No channels found",
      });
    }
    const channelsList = await Promise.all(
      channels.map(async (channel) => {
        const channelId = await handleFetchSingleChannelByName(
          channel.channelName
        );
        return {
          channelName: channel.channelName,
          status: channelId.State,
          channelId: channel.channelId,
        };
      })
    );
    return res.status(200).json({
      message: "Channels fetched successfully",
      data: channelsList,
    });
  } catch (error) {
    next(error);
  }
};
//EXTRACT MEDIA PACKAGE ENDPOINT// Function to extract domain and origin path
function extractDomainAndPath(url) {
  const parsedUrl = new URL(url);
  return {
    domain: parsedUrl.hostname, // Extract domain
    originPath: parsedUrl.pathname, // Extract origin path
  };
}
