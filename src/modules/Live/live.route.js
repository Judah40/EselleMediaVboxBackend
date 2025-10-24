const { Router } = require("express");
const {
  saveLiveDetailsController,
  getLiveDetailsByIdController,
  getAllActiveLiveStreamController,
} = require("./live.controller");
const { validateMatchSchema } = require("../../utils/validators/matchVlidator");
const {
  handleUploadImages,
  uploadImages,
} = require("../../utils/File/imageUploader");
const { requireAdminPriviledge } = require("../../middlewares/auth.middleware");

const router = Router();

//POST
router.post(
  "/",
  requireAdminPriviledge,
  uploadImages,
  validateMatchSchema,
  saveLiveDetailsController
);

//GET
router.get("/:streamId", getLiveDetailsByIdController);

router.get("/", getAllActiveLiveStreamController);

module.exports = router;
