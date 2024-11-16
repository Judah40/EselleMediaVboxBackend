const {
  handleCreateLiveStream,
  handleGetAllLiveStream,
  handleGetSingleLiveStream,
  handleUpdateLiveStream,
  handleUpdateLikeCounter,
} = require("../../controllers/liveStreamController");
const express = require("express");
const { requireAdminPriviledge } = require("../../middlewares/auth.middleware");
const router = express.Router();

const {
  liveStreamValidator,
} = require("../../utils/validators/streamValidationSchema");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LIVE STREAM DATA STORAGE ROUTES
router.post(
  "/create",
  liveStreamValidator,
  requireAdminPriviledge,
  handleCreateLiveStream
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET ALL LIVE STREAM DATA STORAGE ROUTES
router.get("/", handleGetAllLiveStream);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET SINGLE LIVE STREAM DATA STORAGE ROUTES
router.get("/:id", handleGetSingleLiveStream);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE LIVE STREAM DATA STORAGE ROUTES
router.put("/:id", requireAdminPriviledge, handleUpdateLiveStream);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE LIVESTREAM LIKE COUNTER
router.post("/like/:liveId", handleUpdateLikeCounter);
module.exports = router;
