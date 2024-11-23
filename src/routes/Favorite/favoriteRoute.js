const express = require("express");
const {
  handleCreateFavorites,
  handleGetFavorites,
} = require("../../controllers/favoriteController");
const router = express.Router();

////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE FAVORITE
router.post("/create", handleCreateFavorites);
////////////////////////////////////////////////////////////////////////////////////////////////
//GET FAVORITE
router.get("/", handleGetFavorites);
module.exports = router;
