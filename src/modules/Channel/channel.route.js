const { Router } = require("express");
const {
  createChannelController,
  getAllChannelController,
  deleteChannelController,
  checkIfChannelExistsController,
} = require("./channel.controller");
const { handleUploadImages } = require("../../utils/File/imageUploader");
const channelValidator = require("../../utils/validators/channel.validator");

const router = Router();

//POST
router.post("/", handleUploadImages, createChannelController);

//GET

router.get("/", getAllChannelController);
router.get("/:channelId", checkIfChannelExistsController);
//DELETE
router.delete("/:channelId", deleteChannelController);
module.exports = router;
