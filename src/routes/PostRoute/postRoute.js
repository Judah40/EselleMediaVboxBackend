const express = require("express");
const router = express.Router();
const {
  handleCreatingPost,
  handleGetSinglePost,
  handleGetAllPosts,
  handleGetAllPostsByGenre,
} = require("../../controllers/postController");
const { requireAdminPriviledge } = require("../../middlewares/auth.middleware");
const { postValidator } = require("../../utils/validators/postValidatorSchema");
const { uploadMediaMiddleware } = require("../../utils/File/mutipleUploads");
///////////////////////////////////////////////////////////////////////////////////////////
//CREATE POST ROUTE
router.post(
  "/",
  requireAdminPriviledge,
  uploadMediaMiddleware,
  postValidator,
  handleCreatingPost
);
///////////////////////////////////////////////////////////////////////////////////////////
//GET POSTS BY GENRE
router.get("/genre/:genre", handleGetAllPostsByGenre);
///////////////////////////////////////////////////////////////////////////////////////////
//GET SINGLE POST ROUTE
router.get("/:id", handleGetSinglePost);
///////////////////////////////////////////////////////////////////////////////////////////
//READ ALL POST ROUTE
router.get("/", handleGetAllPosts);
///////////////////////////////////////////////////////////////////////////////////////////
//UPDATE POST ROUTE
router.put("/:id", async (req, res) => {});
///////////////////////////////////////////////////////////////////////////////////////////
//DELETE POST ROUTE
router.delete("/:id", async (req, res) => {});
///////////////////////////////////////////////////////////////////////////////////////////
module.exports = router; //export the router
