const { saveLiveDetails } = require("./live.service");

exports.saveLiveDetailsController = async (req, res) => {
  const { streamName, title, description } = req.body;
  try {
    await saveLiveDetails({
      streamName,
      title,
      description,
      banner: req.files.banner[0],
    });
    return res.status(201).json({
      message: "Live details saved successfully",
      statusCode: 201,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

// GET LIVE DETAILS BY ID
exports.getLiveDetailsByIdController = async (req, res) => {
  const { streamId } = req.params;
  try {
    const liveDetails = await getLiveDetailsById(streamId);
    return res.status(200).json({
      message: "Live details fetched successfully",
      statusCode: 200,
      data: liveDetails,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

// GET ALL ACTIVE LIVE STREAMS
exports.getAllActiveLiveStreamController = async (req, res) => {
  try {
    const liveStreams = await getAllActiveLiveStream();
    return res.status(200).json({
      message: "Active live streams fetched successfully",
      statusCode: 200,
      data: liveStreams,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
