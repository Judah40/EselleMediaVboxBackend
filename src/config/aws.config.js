const { S3Client } = require("@aws-sdk/client-s3");
const AWS = require("aws-sdk");
const {
  MediaLiveClient,
  CreateChannelCommand,
} = require("@aws-sdk/client-medialive");
const {
  awsAccessKey,
  awsBucketName,
  awsBucketRegion,
  awsSecretAccessKey,
} = require("../config/default.config");
const { channelConfig } = require("../config/aws.mediachannel.config");

//aws general config
AWS.config.update({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
  },
  region: awsBucketRegion,
});

/**
 * @description This is the configuration file for the AWS S3 bucket.
 * @param {string} awsAccessKey - The access key for the AWS account.
 * @function awsS3Bucket
 */
const S3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
  },
  region: awsBucketRegion,
});

/**
 * @description This is the configuration file for the AWS MediaLive service.
 * @param {string} MediaLiveClient - The access key for the AWS account.
 * @function MediaLiveConfig
 */

const medialLive = new AWS.MediaLive();

module.exports = { S3, medialLive };
