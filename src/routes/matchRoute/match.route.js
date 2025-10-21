const express = require("express");
const {
  handleGetSingleMatch,
} = require("../../controllers/match.controller.js");

const router = express.Router();

//GET SINGLE LIVE MATCH DETAILS
router.get("/:streamName/:Date", handleGetSingleMatch);

module.exports = router;
