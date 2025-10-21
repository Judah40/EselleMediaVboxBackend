const { ChannelList } = require("../models/channelList.model");
const { Match } = require("../models/match.model");
const { handleGetUploadedMediaFromAWSs3Bucket } = require("./awsController");

//GET ALL MATCH
exports.handleGetAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll();
    if (!matches) {
      return res.status(404).json({
        success: false,
        message: "No matches found",
        statusCode: 404,
      });
    }
    return res.status(200).json({
      message: "Successfully gotten all matches",
      statusCode: 200,
      data: matches,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

//GET SINGLE MATCH
exports.handleGetSingleMatch = async (req, res) => {
  try {
    const { streamName, Date } = req.params;
    if (!streamName || !Date) {
      return res.status(400).json({
        success: false,
        message: "Please provide streamName and Date",
        statusCode: 400,
      });
    }

    const streamId = await ChannelList.findOne({
      where: { channelName: streamName },
    });
    const match = await Match.findOne({
      where: {
        streamName: streamId.id,
        Date,
      },
    });

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
        statusCode: 404,
      });
    }

    const leagueLogoUrl = await handleGetUploadedMediaFromAWSs3Bucket(
      match.leagueLogo
    );
    const HomeTeamLogoUrl = await handleGetUploadedMediaFromAWSs3Bucket(
      match.HomeTeamLogo
    );

    const AwayTeamLogoUrl = await handleGetUploadedMediaFromAWSs3Bucket(
      match.AwayTeamLogo
    );

    const updatedMatch = {
      ...match.toJSON(),
      leagueLogo: leagueLogoUrl,
      HomeTeamLogo: HomeTeamLogoUrl,
      AwayTeamLogo: AwayTeamLogoUrl,
    };
    return res.status(200).json({
      message: "Successfully gotten match",
      statusCode: 200,
      data: updatedMatch,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

// END LIVE
exports.handleEndLive = async (req, res) => {
  try {
    const { streamName } = req.params;
    const stream = await ChannelList.findOne({
      where: {
        channelName: streamName,
      },
    });
    if (!stream) {
      return res.status(404).json({
        success: true,
        message: "Stream not found",
      });
    }
    await ChannelList.update(
      {
        isLive: false,
      },
      {
        where: {
          channelName: streamName,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Live stopped successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error.message,
    });
  }
};
