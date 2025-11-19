const { Router } = require("express");
const {
  createChannelController,
  getAllChannelController,
  deleteChannelController,
  checkIfChannelExistsController,
  updateChannelStatus,
} = require("./channel.controller");
const { handleUploadImages } = require("../../utils/File/imageUploader");
const channelValidator = require("../../utils/validators/channel.validator");
const { requireAdminPriviledge } = require("../../middlewares/auth.middleware");

const router = Router();

//POST
router.post(
  "/",
  requireAdminPriviledge,
  handleUploadImages,
  createChannelController
);

//GET

router.get("/", getAllChannelController);
router.get(
  "/:channelId",
  requireAdminPriviledge,
  checkIfChannelExistsController
);
//DELETE
router.delete("/:channelId", requireAdminPriviledge, deleteChannelController);

//UPDATE
router.patch("/:channelId", requireAdminPriviledge, updateChannelStatus);
module.exports = router;
