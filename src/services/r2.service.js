// r2.service.js
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { fileTypeFromBuffer } = require("file-type"); // for auto MIME detection
const { cloudfareBucketName } = require("../config/default.config");
const { R2Client } = require("../config/r2.config");

/////////////////////////////////////////////////////////////////
// 🧾 Utility: Generate signed URL for a single object
const getSignedUrlForR2Object = async (key) => {
  try {
    const params = {
      Bucket: cloudfareBucketName,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    return await getSignedUrl(R2Client, command, { expiresIn: 3600 }); // 1 hour
  } catch (error) {
    console.error("❌ Failed to generate signed URL:", error);
    throw new Error("Unable to generate signed URL");
  }
};

/////////////////////////////////////////////////////////////////
// 🆙 Upload a file to R2
exports.uploadToR2Bucket = async (key, fileBuffer, contentType) => {
  try {
    let detectedType = contentType;

    // Detect MIME type automatically if not provided
    if (!contentType) {
      const typeResult = await fileTypeFromBuffer(fileBuffer);
      detectedType = typeResult?.mime || "application/octet-stream";
    }

    const params = {
      Bucket: cloudfareBucketName,
      Key: key,
      Body: fileBuffer,
      ContentType: detectedType,
    };

    const command = new PutObjectCommand(params);
    await R2Client.send(command);

    console.log(`✅ Uploaded ${key} to R2 successfully.`);
    return { key, message: "Upload successful" };
  } catch (error) {
    console.error(`❌ Failed to upload ${key}:`, error);
    throw new Error("Upload to R2 failed");
  }
};

/////////////////////////////////////////////////////////////////
// 📥 Get a single file URL from R2
exports.getR2ObjectUrl = async (key) => {
  try {
    return await getSignedUrlForR2Object(key);
  } catch (error) {
    console.error("❌ Failed to get R2 object URL:", error);
    throw new Error("Unable to fetch object URL");
  }
};

/////////////////////////////////////////////////////////////////
// 📦 Get multiple file URLs from R2
exports.getMultipleR2ObjectUrls = async (keys) => {
  try {
    if (!Array.isArray(keys) || keys.length === 0) {
      throw new Error("No valid keys provided");
    }

    const urls = await Promise.all(
      keys.map(async (key) => await getSignedUrlForR2Object(key))
    );

    return urls;
  } catch (error) {
    console.error("❌ Failed to fetch multiple R2 object URLs:", error);
    throw new Error("Unable to fetch media");
  }
};
