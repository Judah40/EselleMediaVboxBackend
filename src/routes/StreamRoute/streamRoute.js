const express = require("express");
const router = express.Router();
const {
  handleGenerateStreamKey,
  handleGetStreamKey,
} = require("../../controllers/streamController");
const { requireAdminPriviledge } = require("../../middlewares/auth.middleware");

//////////////////////////////////////////////////////////////////////////////////////
//GENERATE STREAM KEY
router.post("/generate-key", requireAdminPriviledge, handleGenerateStreamKey);

//////////////////////////////////////////////////////////////////////////////////////
//GET STREAM KEY
router.get("/get-streamKey", requireAdminPriviledge, handleGetStreamKey);

module.exports = router;
