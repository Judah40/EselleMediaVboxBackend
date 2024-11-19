const { Messages } = require("../models/message.model");

////////////////////////////////////////////////////////////////
// CREATE MESSAGEW CONTROLLER
exports.handleCreateMessage = async (req, res) => {
  const { text, name } = req.body;
  try {
    const Message = await Messages.create({
      message: text,
      fullName: name,
    });
    if (!Message) {
      return res.status(400).json({ message: "Failed to create message" });
    }
    return res.status(201).json({ message: "Message created successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating meesage",
      error: error,
      status: error.status,
    });
  }
};

////////////////////////////////////////////////////////////////
// GET ALL MESSAGES CONTROLLER
exports.handleGetAllMessages = async (req, res) => {
  try {
    const Message = await Messages.findAll();
    return res.status(200).json({
      message: "Messages retrieved successfully",
      data: Message,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting messages ",
      error: error,
      status: error.status,
    });
  }
};

////////////////////////////////////////////////////////////////
// GET MESSAGE BY ID CONTROLLER
exports.handleGetMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const Message = await Messages.findOne({
      where: { id: id },
    });
    if (!Message) {
      return res.status(404).json({ message: "Message not found" });
    }
    return res.status(200).json({ message: Message });
  } catch {
    return res.status(500).json({
      message: "Error getting comments for live",
      error: error,
      status: error.status,
    });
  }
};
