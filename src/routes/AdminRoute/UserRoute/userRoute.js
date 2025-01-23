const express = require("express");
const router = express.Router();
const {
  handleDeactivateUser,
  handleGetAllUsers,
  handleActivateUser,
  handleGetSingleUser,
} = require("../../../controllers/AdminController/UserController/userController");
const { requireAdminPriviledge } = require("../../../middlewares/auth.middleware");

////////////////////////////////////////////////////////////////
//DEACTIVATE USER
router.put("/user/deactivate/:id", requireAdminPriviledge, handleDeactivateUser);
////////////////////////////////////////////////////////////////
//ACTIVATE USER
router.put("/user/activate/:id", requireAdminPriviledge, handleActivateUser);

////////////////////////////////////////////////////////////////
//GET ALL USER
router.get("/user/:id", handleGetAllUsers);

////////////////////////////////////////////////////////////////
//GET SINGLE USER
router.get("/user/singleUser/:id", handleGetSingleUser);
module.exports = router;
