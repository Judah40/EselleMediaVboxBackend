const { S3, medialLive } = require("../config/aws.config");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { awsBucketName } = require("../config/default.config");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
const { channelConfig } = require("../config/aws.mediachannel.config");
const {
  getMediaLiveInputByName,
} = require("../services/aws/getMediaLiveInputByName");
const {
  handleFetchSingleChannelByName,
} = require("../services/aws/getMediaLiveChannelByName");
const { fetchSecurityGroup } = require("../services/aws/fetchSecurityGroup");
const { createSecurityGroup } = require("../services/aws/createSecurityGroup");
const {
  createMediaPackageChannel,
} = require("../services/aws/createMediaPackageChannel");
const { ChannelList } = require("../models/channelList.model");
const { where } = require("sequelize");
const {
  createMediaPackageEndpoint,
} = require("../services/aws/createMediaPackageEndpoint");
const getSignedUrlForFile = async (key) => {
  const params = {
    Bucket: awsBucketName,
    Key: key,
  };
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(S3, command, { expiresIn: 3600 }); // URL expires in 1 hour
  return url;
};

/////////////////////////////////////////////////////////////////
//UPLOAD COMMAND
exports.handleUploadImageToAWSs3bucket = async (key, body, contentType) => {
  const params = {
    Bucket: awsBucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  };
  const command = new PutObjectCommand(params);
  return await S3.send(command);
};

/////////////////////////////////////////////////////////////////
//GET COMMAND
exports.handleGetUploadedMediaFromAWSs3Bucket = async (key) => {
  const params = {
    Bucket: awsBucketName,
    Key: key,
  };
  const command = new GetObjectCommand(params);
  // console.log(command);/
  const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
  return url;
};
/////////////////////////////////////////////////////////////////
//GET COMMAND
exports.handleGetMultipleUploadedMediaFromAWSs3Bucket = async (keys) => {
  try {
    if (!Array.isArray(keys) || keys.length === 0) {
      throw new Error("No valid keys provided");
    }

    const mediaUrls = await Promise.all(
      keys.map(async (key) => {
        // Assuming key is valid
        const url = await getSignedUrlForFile(key); // Replace this with your actual implementation
        return url;
      })
    );

    return mediaUrls;
  } catch (error) {
    console.error("Error fetching media from S3:", error);
    throw new Error("Failed to fetch media");
  }
};

//CREATE INPUT CONTROLLER
exports.handleCreateInput = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Input name is required" });
  }
  // Check if security group already exists
  var securityGroup = await fetchSecurityGroup();
  // If security group does not exist, create one
  if (!securityGroup) {
    securityGroup = await createSecurityGroup();
  }
  const params = {
    Name: name,
    Type: "RTMP_PUSH",
    InputSecurityGroups: [securityGroup],
    Destinations: [{ StreamName: `live/stream-${name}` }],
  };
  try {
    const data = await medialLive.createInput(params).promise();
    res.json({ message: "Channel created successfully", input: data.Input });
  } catch (error) {
    next(error);
  }
};
///////////////////////////////////////////////// ///////////////////////////
//CREATE CHANNEL CONTROLLER

exports.createChannel = async (req, res, next) => {
  const { inputName, ChannelName } = req.body;

  if (!inputName || !ChannelName) {
    return res
      .status(400)
      .json({ message: "Input name and channel name are required" });
  }
  // generate a unique destination ID
  const destinationId = uuidv4();

  try {
    const inputId = await getMediaLiveInputByName(inputName);
    if (!inputId) {
      return res.status(404).json({ message: "Input not found" });
    }
    const existingChannel = await ChannelList.findOne({
      where: { channelName: ChannelName },
    });
    if (existingChannel) {
      return res.status(400).json({ message: "Channel already exists" });
    }
    const mediaPackageChannel = await createMediaPackageChannel(destinationId);

    const params = channelConfig(
      ChannelName,
      inputId.InputId,
      destinationId,
      mediaPackageChannel.Id,
      mediaPackageChannel.HlsIngest.IngestEndpoints[0].Url
    );

    const mediaPackageEndpoint = await createMediaPackageEndpoint(
      mediaPackageChannel.Id
    );
    if (!mediaPackageEndpoint) {
      return res
        .status(400)
        .json({ message: "MediaPackage Endpoint not created" });
    }
    const data = await medialLive.createChannel(params).promise();
    // Save the channel ID to the database
    await ChannelList.create({
      channelName: ChannelName,
      channelId: destinationId,
    });
    console.log("Channel created successfully:", data);
    return res
      .status(200)
      .json({ message: "Channel created successfully", data: data.Channel });
  } catch (error) {
    next(error);
  }
};

/////////////////////////////////////////////////////////////////
//START CHANNEL CONTROLLER
exports.startChannel = async (req, res, next) => {
  const { channelName } = req.body;

  if (!channelName) {
    return res.status(400).json({ message: "Channel name is required" });
  }
  try {
    const channelId = await handleFetchSingleChannelByName(channelName);
    if (!channelId) {
      return res.status(404).json({ message: "Channel not found" });
    }
    const data = await medialLive
      .startChannel({ ChannelId: channelId.Id })
      .promise();
    console.log("Channel started successfully:", data);
    return res.status(200).json({ message: "Channel started successfully" });
  } catch (error) {
    next(error);
  }
};

/////////////////////////////////////////////////////////////////
//STOP CHANNEL CONTROLLER
exports.stopChannel = async (req, res, next) => {
  const { channelName } = req.body;

  if (!channelName) {
    return res.status(400).json({ message: "Channel name is required" });
  }
  try {
    const channelId = await handleFetchSingleChannelByName(channelName);
    if (!channelId) {
      return res.status(404).json({ message: "Channel not found" });
    }
    const data = await medialLive
      .stopChannel({ ChannelId: channelId.Id })
      .promise();
    console.log("Channel stopped successfully:", data);
    return res.status(200).json({ message: "Channel stopped successfully" });
  } catch (error) {
    next(error);
  }
};

/////////////////////////////////////////////////////////////////
//GET LIVESTREAM DETAIL CONTROLLER

exports.getLiveStreamDetail = async (req, res, next) => {
  const { channelName } = req.body;

  if (!channelName) {
    return res.status(400).json({ message: "Channel name is required" });
  }
  try {
    const channel = await getMediaLiveInputByName(channelName);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    const data = await medialLive
      .describeInput({ InputId: channel.InputId })
      .promise();
    console.log("Channel details fetched successfully:", data);
    return res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};
