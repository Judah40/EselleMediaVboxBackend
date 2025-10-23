const { Router } = require("express");
const {
  createChannelController,
  getAllChannelController,
  deleteChannelController,
  checkIfChannelExistsController,
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
module.exports = router;
