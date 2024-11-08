const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const {
  createStreamKey,
  isStreamKeyExpired,
} = require("../utils/DateChecker/streamKeyUtils");
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
