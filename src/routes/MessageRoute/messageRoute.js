const express = require("express");
const {
  validateMessageSchema,
} = require("../../utils/validators/messageValidation");
const {
  handleCreateMessage,
  handleGetAllMessages,
  handleGetMessageById,
} = require("../../controllers/messageController");
const { requireAdminPriviledge } = require("../../middlewares/auth.middleware");
const router = express.Router();

////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE MESSAGES
router.post("/create", validateMessageSchema, handleCreateMessage);

////////////////////////////////////////////////////////////////////////////////////////////////
// GET ALL MESSAGES
router.get("/all", requireAdminPriviledge, handleGetAllMessages);

////////////////////////////////////////////////////////////////////////////////////////////////
// GET MESSAGE BY ID
router.get("/:id", requireAdminPriviledge, handleGetMessageById);

module.exports = router;
