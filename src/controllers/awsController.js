const { S3, medialLive } = require("../config/aws.config");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { awsBucketName } = require("../config/default.config");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Stream } = require("twilio/lib/twiml/VoiceResponse");
const { v4: uuidv4 } = require("uuid");
const { channelConfig } = require("../config/aws.mediachannel.config");
const {
  getMediaLiveInputByName,
} = require("../services/aws/getMediaLiveInputByName");
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

/////////////////////////////////////////////////////////////////
//CREATE SECURITY GROUP COMMAND
const createSecurityGroup = async () => {
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
/////////////////////////////////////////////////////////////////
//FETCH ALREADY EXISITING SECURITY GROUP COMMAND
const fetchSecurityGroup = async () => {
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
//CREATE INPUT CONTROLLER
exports.handleCreateInput = async (req, res, next) => {
  const { name } = req.body;

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

//CREATE CHANNEL CONTROLLER
exports.createChannel = async (req, res, next) => {
  const { inputName, ChannelName } = req.body;
  // generate a unique destination ID
  const destinationId = uuidv4();

  try {
    const inputId = await getMediaLiveInputByName(inputName);
    const params = channelConfig(
      ChannelName,
      inputId.InputId,
      destinationId,
      inputId.destinationUrl,
      inputId.arn,
      inputId.streamName
    );
    if (!inputId) {
      return res.status(404).json({ message: "Input not found" });
    }
    const data = await medialLive.createChannel(params).promise();
    console.log("Channel created successfully:", data);
    return res
      .status(200)
      .json({ message: "Channel created successfully", data: data.Channel });
  } catch (error) {
    next(error);
  }
};
