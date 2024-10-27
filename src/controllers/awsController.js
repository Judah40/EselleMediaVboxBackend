const { S3 } = require("../config/aws.config");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { awsBucketName } = require("../config/default.config");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
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
  const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
  return url;
};
