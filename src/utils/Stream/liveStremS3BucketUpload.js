const { readFileSync, unlinkSync } = require("fs");
const {
  handleUploadImageToAWSs3bucket,
} = require("../../controllers/awsController");

exports.uploadLiveStreamVideoToS3asVideoOnDemand = async (
  filePath,
  streamKey
) => {
  try {
    const fileContent = readFileSync(filePath);
    const uploadToS3 = await handleUploadImageToAWSs3bucket(
      streamKey,
      fileContent,
      "video/mp4"
    );
    unlinkSync(filePath);
    return uploadToS3.Location;
    return;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};
