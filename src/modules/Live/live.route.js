const { Router } = require("express");
const {
  saveLiveDetailsController,
  getLiveDetailsByIdController,
  getAllActiveLiveStreamController,
} = require("./live.controller");
const { validateMatchSchema } = require("../../utils/validators/matchVlidator");
const { handleUploadImages } = require("../../utils/File/imageUploader");

const router = Router();

//POST
router.post(
  "/",
  validateMatchSchema,
  handleUploadImages,
  saveLiveDetailsController
);

//GET
router.get("/:streamId", getLiveDetailsByIdController);

router.get("/", getAllActiveLiveStreamController);
