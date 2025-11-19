const {
  createChannelService,
  getAllChannelService,
  deleteChannelService,
  checkIfChannelExist,
  updateChannelLiveStatusService,
} = require("./channel.service");

exports.createChannelController = async (req, res) => {
  const { channelName } = req.body;

  if (!channelName) {
    res.status(400).json({
      message: "CHANNEL NAME REQUIRED",
    });
  }
  const { mimetype, buffer } = req.file;

  const { id } = req.user;

  try {
    await createChannelService(channelName, buffer, mimetype, id);
    return res.status(201).json({
      message: "CHANNEL SUCCESSFULLY CREATED",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

exports.getAllChannelController = async (req, res) => {
  try {
    const channels = await getAllChannelService();

    return res.status(201).json({
      data: channels,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

exports.deleteChannelController = async (req, res) => {
  const { channelId } = req.params;
  try {
    await deleteChannelService(channelId);
    return res.status(201).json({
      message: "CHANNEL SUCCESSFULLY DELETED",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

exports.checkIfChannelExistsController = async (req, res) => {
  const { channelId } = req.params;
  try {
    if (channelId.length !== 36) {
      return res.status(200).json({
        channelExists: false,
      });
    }
    await checkIfChannelExist(channelId);
    res.status(200).json({
      channelExists: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 404, channelExists: false });
  }
};

exports.updateChannelStatus = async (req, res) => {
  const { channelId } = req.params;
  try {
    if (channelId.length !== 36) {
      return res.status(200).json({
        message: "WRONG CHANNEL ID FORMAT",
      });
    }
    await updateChannelLiveStatusService({ channelId });
    res.status(200).json({
      message: "SUCCESSFULLY UPDATED",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 404 });
  }
};
