const { viewerCounts, nms } = require("../config/mediaServer.config");
const {
  createStreamKey,
  isStreamKeyExpired,
} = require("../utils/DateChecker/streamKeyUtils");
const {
  uploadLiveStreamVideoToS3asVideoOnDemand,
} = require("../utils/Stream/liveStremS3BucketUpload");
const streamKeys = {};
//////////////////////////////////////////////////////////////////////////////////////
//CREATE STREAMKEY
exports.handleGenerateStreamKey = async (req, res) => {
  try {
    const { id } = req.user;
    const streamKey = createStreamKey();
    const createdAt = new Date();
    streamKeys[id] = { streamKey, createdAt };
    res.status(200).json({
      message: "Stream key generated successfully",
      streamKey,
      createdAt: createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

//////////////////////////////////////////////////////////////////////////////////////
//GET STREAMKEY
exports.handleGetStreamKey = async (req, res) => {
  try {
    const { id } = req.user;
    const { streamKey, createdAt } = streamKeys[id];

    if (!streamKey) {
      return res.status(404).json({ message: "Stream key not found" });
    }
    // Check if the stream key has expired
    if (isStreamKeyExpired(createdAt)) {
      return res.status(410).json({ message: "Stream key has expired" });
    }

    return res.status(200).json({ streamKey });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

////////////////////////////////////////////////////////////////////////////
//HANDLE GET STREAM VIEWERS

exports.handleGetStreamViewers = async (req, res) => {
  const { streamKey } = req.params;
  try {
    const count = viewerCounts[streamKey] || 0;
    res.json({ streamKey, viewers: count });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

//////////////////////////////////////////////////////////////////////////////////////
//HANDLE END LIVESTREAM
exports.handleEndLivestream = async (req, res) => {
  const { streamKey } = req.params;
  let sessionFound = false;
  nms.getSession().forEach((session) => {
    if (publishStreamPath === `/live/${streamKey}`) {
      session.stop(); // Stop the stream session
      sessionFound = true;
      console.log(`Stream ${streamKey} has been stopped.`);
    }
  });

  if (!sessionFound) {
    return res
      .status(404)
      .json({ success: false, message: `Stream ${streamKey} not found.` });
  }

  // Path to the recorded file
  const recordedFilePath = path.join(
    __dirname,
    "media",
    "live",
    `${streamKey}.mp4`
  );

  if (fs.existsSync(recordedFilePath)) {
    console.log(`Uploading ${recordedFilePath} to S3...`);
    try {
      const fileUrl = await uploadLiveStreamVideoToS3asVideoOnDemand(
        recordedFilePath,
        streamKey
      );
      return res.json({
        success: true,
        message: `Stream ${streamKey} ended and uploaded t.`,
        fileUrl,
      });
    } catch (err) {
      return res
        .status(500)
        .json({
          success: false,
          message: `Failed to upload video: ${err.message}`,
        });
    }
  } else {
    return res
      .status(200)
      .json({
        success: true,
        message: `Stream ${streamKey} ended, but no recorded file found.`,
      });
  }
};
