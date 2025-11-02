const { S3 } = require("../config/aws.config");
const { R2Client } = require("../config/r2.config");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const {
  awsBucketName,
  cloudfareBucketName,
} = require("../config/default.config");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const getSignedUrlForFile = async (key) => {
  const params = {
    Bucket: cloudfareBucketName,
    Key: key,
  };
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(R2Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
  return url;
};

/////////////////////////////////////////////////////////////////
//UPLOAD COMMAND
exports.handleUploadImageToAWSs3bucket = async (key, body, contentType) => {
  const params = {
    Bucket: cloudfareBucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  };
  const command = new PutObjectCommand(params);
  return await R2Client.send(command);
};

/////////////////////////////////////////////////////////////////
//GET COMMAND
exports.handleGetUploadedMediaFromAWSs3Bucket = async (key) => {
  const params = {
    Bucket: cloudfareBucketName,
    Key: key,
  };
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(R2Client, command, { expiresIn: 3600 });
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
