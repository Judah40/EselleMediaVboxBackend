const {
  handleAddToMyListService,
  handleGetAllMyVideoListService,
  handleRemoveFromMyListService,
} = require("./mylist.service");

exports.handleAddToMyListController = async (req, res) => {
  const { id } = req.user;
  const { videoId } = req.body;

  if (!videoId)
    return res.status(400).json({
      message: "VIDEO ID REQUIRED",
    });
  try {
    await handleAddToMyListService({ videoId, userId: id });
    return res.status(201).json({
      message: "SUCCESSFULLY ADDED TO YOUR LIST",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

exports.handleGetAllMyVideoListController = async (req, res) => {
  const { id } = req.user;
  try {
    const list = await handleGetAllMyVideoListService(id);
    return res.status(200).json({
      message: "SUCCESSFULLY GOTTEN YOUR LIST ",
      data: list,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

exports.handleReoveFromFavoriteController = async (req, res) => {
  const { id: userId } = req.user;
  const { id: videoId } = req.params;
  try {
    await handleRemoveFromMyListService({ videoId, userId });
    return res.status(200).json({
      message: "SUCCESSFULLY REMOVED FROM YOUR LIST",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
