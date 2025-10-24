const { Router } = require("express");
const {
  handleAddToMyListController,
  handleGetAllMyVideoListController,
  handleReoveFromFavoriteController,
} = require("./mylist.controller");

const router = Router();

//POST
router.post("/", handleAddToMyListController);

//GET
router.get("/", handleGetAllMyVideoListController);

//DELETE
router.delete("/:id", handleReoveFromFavoriteController);
module.exports = router;
