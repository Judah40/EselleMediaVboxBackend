const { S3Client } = require("@aws-sdk/client-s3");
const {
  cloudfareAccessKeyId,
  cloudfareSecretKey,
  cloudfareJurisdictionEndpointEu,
} = require("./default.config");

exports.R2Client = new S3Client({
  region: "auto",
  endpoint: cloudfareJurisdictionEndpointEu,
  credentials: {
    accessKeyId: cloudfareAccessKeyId,
    secretAccessKey: cloudfareSecretKey,
  },
});
