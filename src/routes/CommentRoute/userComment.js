const express = require("express");
const {
  handleCreateComment,
  handleGetAllComments,
  handleDeleteComment,
  handleDeleteCommentForVod,
  handleCreateCommentForVod,
  handleGetAllCommentsForVod,
} = require("../../controllers/commentController");
const {
  CommentValidator,
  vodCommentValidator,
} = require("../../utils/validators/commentValidator");
const {
  requireAuthenticatedUser,
} = require("../../middlewares/auth.middleware");
const router = express.Router();

////////////////////////////////////////////////////////////////
//CREATE LIVE COMMENT
router.post(
  "/live",
  CommentValidator,
  requireAuthenticatedUser,
  handleCreateComment
);
////////////////////////////////////////////////////////////////
//CREATE LIVE COMMENT FOR VOD
router.post(
  "/vod",
  vodCommentValidator,
  requireAuthenticatedUser,
  handleCreateCommentForVod
);
////////////////////////////////////////////////////////////////
//GET ALL LIVE COMMENTS FOR VOD
router.get("/vod/:id", handleGetAllCommentsForVod);
////////////////////////////////////////////////////////////////
//GET ALL LIVE COMMENTS
router.get("/live/:id", handleGetAllComments);
////////////////////////////////////////////////////////////////
//DELETE SINGLE LIVE COMMENT
router.delete(
  "/live/:commentId",
  requireAuthenticatedUser,
  handleDeleteComment
);
////////////////////////////////////////////////////////////////
//DELETE SINGLE LIVE COMMENT FOR VOD
router.delete(
  "/vod/:commentId",
  requireAuthenticatedUser,
  handleDeleteCommentForVod
);

module.exports = router;
