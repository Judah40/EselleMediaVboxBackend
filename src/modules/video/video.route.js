const express = require("express");
const router = express.Router();
const {
  handleCreatingPost,
  handleGetSinglePost,
  handleGetAllPosts,
  handleGetAllPostsByGenre,
  handleGetAllPostByFavorite,
  handleGetPostsByGenre,
} = require("./video.controller");
const {
  requireAdminPriviledge,
  requireAuthenticatedUser,
  optionalAuth,
} = require("../../middlewares/auth.middleware");
const { postValidator } = require("../../utils/validators/postValidatorSchema");
const { uploadMediaMiddleware } = require("../../utils/File/mutipleUploads");
///////////////////////////////////////////////////////////////////////////////////////////
//CREATE POST ROUTE
router.post(
  "/",
  requireAdminPriviledge,
  uploadMediaMiddleware,
  // postValidator,
  handleCreatingPost
);
///////////////////////////////////////////////////////////////////////////////////////////
//GET ALL POSTS BY GENRE
router.get("/genre/", optionalAuth, handleGetAllPostsByGenre);
///////////////////////////////////////////////////////////////////////////////////////////
//GET SINGLE POSTS BY GENRE
router.get("/genre/:genre", optionalAuth, handleGetPostsByGenre);
///////////////////////////////////////////////////////////////////////////////////////////
//GET SINGLE POST ROUTE
router.get("/:id", optionalAuth, handleGetSinglePost);
///////////////////////////////////////////////////////////////////////////////////////////
//READ ALL POST BY FAVORITE ROUTE
router.get("/favorites/all", optionalAuth, handleGetAllPostByFavorite);
///////////////////////////////////////////////////////////////////////////////////////////
//READ ALL POST ROUTE
router.get("/", optionalAuth, handleGetAllPosts);
///////////////////////////////////////////////////////////////////////////////////////////
//UPDATE POST ROUTE
router.put("/:id", async (req, res) => {});
///////////////////////////////////////////////////////////////////////////////////////////
//DELETE POST ROUTE
router.delete("/:id", async (req, res) => {});
///////////////////////////////////////////////////////////////////////////////////////////
module.exports = router; //export the router
