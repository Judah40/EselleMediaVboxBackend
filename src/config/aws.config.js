const { S3Client } = require("@aws-sdk/client-s3");
const {
  awsAccessKey,
  awsBucketName,
  awsBucketRegion,
  awsSecretAccessKey,
} = require("../config/default.config");
const S3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
  },
  region: awsBucketRegion,
});

module.exports = { S3 };
