const { Likes } = require("../models/like.model");
const { Live } = require("../models/live.model");
const { randomDelay } = require("../utils/Delay/delay");
////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE LIVE STREAM DATA CONTROLLER
exports.handleCreateLiveStream = async (req, res) => {
  try {
    const { title, description, streamKey, location, tags } = req.body;
    // , thumbnail, video
    const { id } = req.user;
    const existingStream = await Live.findOne({ where: { liveId: streamKey } });
    // return res.send({
    //   existingStream,
    // });
    if (existingStream) {
      return res.status(401).json({
        message: "Stream key already in use",
      });
    }

    const newLive = await Live.create({
      liveId: streamKey,
      title,
      description,
      location,
      tags,
      userId: id,
    });
    if (newLive) {
      return res
        .status(201)
        .json({ message: "Live stream created successfully" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error creating live stream",
      error: error,
      status: error.status,
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
// GET ALL LIVE STREAM DATA CONTROLLER
exports.handleGetAllLiveStream = async (req, res) => {
  try {
    const { id } = req.user;
    const getAllLiveStream = await Live.findAll({
      where: { userId: id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "id"],
      },
    });

    if (!getAllLiveStream) {
      return res.status(200).json({ data: {} });
    }
    return res.status(200).json({ data: getAllLiveStream, status: 200 });
  } catch (error) {
    res.status(500).json({
      message: "Error creating live stream",
      error: error,
      status: error.status,
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////
// GET SINGLE LIVE STREAM DATA CONTROLLER
exports.handleGetSingleLiveStream = async (req, res) => {
  const { id } = req.params;
  try {
    const existingStream = await Live.findOne({
      where: { liveId: id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "id"],
      },
    });
    if (!existingStream) {
      return res.status(404).json({ message: "Live stream not found" });
    }
    return res.status(200).json({ data: existingStream, status: 200 });
  } catch (error) {
    res.status(500).json({
      message: "Error creating live stream",
      error: error,
      status: error.status,
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE LIVE STREAM DATA CONTROLLER
exports.handleUpdateLiveStream = (req, res) => {};

////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE LIKE COUNTER
exports.handleUpdateLikeCounter = async (req, res) => {
  const like = 1;
  const { id } = req.user;
  const { liveId } = req.params;
  try {
    const liveData = await Live.findOne({
      where: {
        liveId: liveId,
      },
    });

    if (liveData) {
      const userAlreadyLiked = await Likes.findOne({
        where: { userId: id },
      });
      if (!userAlreadyLiked) {
        const likedCreated = await Likes.create({
          userId: id,
          like: like,
          liveId: liveId,
        });
        if (likedCreated) {
          randomDelay();
          await Live.increment("likeCount", {
            by: 1,
            where: { liveId: liveId },
          });
          return res.status(200).json({ message: "liked successfully" });
        }
      }
      randomDelay();
      await userAlreadyLiked.destroy();
      await Live.increment("likeCount", {
        by: -1,
        where: { liveId: liveId },
      });
      return res.status(200).json({ message: "liked removed" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error creating live stream",
      error: error,
      status: error.status,
    });
  }
};
