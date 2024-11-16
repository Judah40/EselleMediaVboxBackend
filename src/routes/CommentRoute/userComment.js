const express = require("express");
const {
  handleCreateComment,
  handleGetAllComments,
  handleDeleteComment,
} = require("../../controllers/commentController");
const { CommentValidator } = require("../../utils/validators/commentValidator");
const router = express.Router();

////////////////////////////////////////////////////////////////
//CREATE COMMENT
router.post("/", CommentValidator, handleCreateComment);

////////////////////////////////////////////////////////////////
//GET ALL COMMENTS
router.get("/:id", handleGetAllComments);
////////////////////////////////////////////////////////////////
//DELETE COMMENT
router.delete("/:commentId", handleDeleteComment);


module.exports = router;
