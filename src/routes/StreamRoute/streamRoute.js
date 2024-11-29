const express = require("express");
const router = express.Router();
const {
  handleGenerateStreamKey,
  handleGetStreamKey,
  handleGetStreamViewers,
  handleEndLivestream,
} = require("../../controllers/streamController");
const { requireAdminPriviledge } = require("../../middlewares/auth.middleware");

//////////////////////////////////////////////////////////////////////////////////////
//GENERATE STREAM KEY
router.post("/generate-key", requireAdminPriviledge, handleGenerateStreamKey);

//////////////////////////////////////////////////////////////////////////////////////
//GET STREAM KEY
router.get("/get-streamKey", requireAdminPriviledge, handleGetStreamKey);

//////////////////////////////////////////////////////////////////////////////////////
//GET STREAM VIEWERS
router.get("/viewers/:streamKey", handleGetStreamViewers);
//////////////////////////////////////////////////////////////////////////////////////
//END STREAM
router.delete("/end-stream/:streamKey", handleEndLivestream);

module.exports = router;
