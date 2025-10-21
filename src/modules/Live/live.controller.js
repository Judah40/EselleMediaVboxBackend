const { saveLiveDetails } = require("./live.service");

exports.saveLiveDetailsController = async (req, res) => {
  const { streamName, title, description, banner } = req.body;
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
