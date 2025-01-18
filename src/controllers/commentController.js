const { socketIo } = require("../config/socketConfig");
const { Comment } = require("../models/comment.model");
const {vodComment} = require("../models/comments.vod.model");
////////////////////////////////////////////////////////////////
// CREATE COMMENTS FOR A LIVE
exports.handleCreateComment = async (req, res) => {
  const { comment, liveId } = req.body;
  const { id } = req.user;

  try {
    const createdComment = await Comment.create({
      liveId: liveId,
      userId: id,
      comment: comment,
    });
    if (createdComment) {
      socketIo.emit("createComment", createdComment);
      res.status(201).json({ message: "Comment created successfully" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error creating live stream",
      error: error,
      status: error.status,
    });
  }
};

////////////////////////////////////////////////////////////////
// GET ALL COMMENTS FOR A LIVE
exports.handleGetAllComments = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Live ID is required" });
    }
    const comments = await Comment.findAll(
      {
        where: { liveId: id },
      },
      {
        attribute: ["id", "createAt", "updatedAt"],
      }
    );

    if (comments.length === 0) {
      res.status(200).json({
        data: {},
        message: "No comments found for this live",
      });
    }
    res
      .status(200)
      .json({ data: comments, message: "Comments fetched successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error getting comments for live",
      error: error,
      status: error.status,
    });
  }
};
////////////////////////////////////////////////////////////////
// DELETE SIGNLE COMMENTS FOR A LIVE

exports.handleDeleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { id } = req.user;
  try {
    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required" });
    }
    const existingComment = await Comment.findOne({
      where: { id: commentId },
    });
    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const commentDelete = await Comment.destroy({
      where: {
        id: commentId,
        userId: id,
      },
    });
    if (commentDelete) {
      return res.status(200).json({
        message: "Comment deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error getting comments for live",
      error: error,
      status: error.status,
    });
  }
};

////////////////////////////////////////////////////////////////
// CREATE COMMENTS FOR A VIDEOS ON DEMAND

exports.handleCreateCommentForVod = async (req, res) => {
  const { comment, vodId } = req.body;
  const { id } = req.user;

  try {
    const createdComment = await vodComment.create({
      vodId: vodId,
      userId: id,
      comment: comment,
    });
    if (createdComment) {
      socketIo.emit("createComment", createdComment);
      res.status(201).json({ message: "Comment created successfully" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error creating live stream",
      error: error,
      status: error.status,
    });
  }
}

////////////////////////////////////////////////////////////////
// GET ALL COMMENTS FOR A VIDEOS ON DEMAND

exports.handleGetAllCommentsForVod = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Vod ID is required" });
    }
    const comments = await vodComment.findAll(
      {
        where: { vodId: id },
      },
      {
        attribute: ["id", "updatedAt"],
      }
    );

    if (comments.length === 0) {
      res.status(200).json({
        data: {},
        message: "No comments found for this live",
      });
    }
    res
      .status(200)
      .json({ data: comments, message: "Comments fetched successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error getting comments for live",
      error: error,
      status: error.status,
    });
  }
}

////////////////////////////////////////////////////////////////
// DELETE SINGLE COMMENT FOR A VIDEOS ON DEMAND

exports.handleDeleteCommentForVod = async (req, res) => {
  const { commentId } = req.params;
  const { id } = req.user;
  try {
    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required" });
    }
    const existingComment = await vodComment.findOne({
      where: { id: commentId },
    });
    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const commentDelete = await vodComment.destroy({
      where: {
        id: commentId,
        userId: id,
      },
    });
    if (commentDelete) {
      return res.status(200).json({
        message: "Comment deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error getting comments for live",
      error: error.message,
      status: error.status,
    });
  }
}