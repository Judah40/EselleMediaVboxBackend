const express = require("express");
const router = express.Router();
const {
  handleDeactivateUser,
  handleGetAllUsers,
  handleActivateUser,
  handleGetSingleUser,
} = require("../../../controllers/AdminController/UserController/userController");

////////////////////////////////////////////////////////////////
//DEACTIVATE USER
router.put("/user/deactivate/:id", handleDeactivateUser);
////////////////////////////////////////////////////////////////
//ACTIVATE USER
router.put("/user/activate/:id", handleActivateUser);

////////////////////////////////////////////////////////////////
//GET ALL USER
router.get("/user/:id", handleGetAllUsers);

////////////////////////////////////////////////////////////////
//GET SINGLE USER
router.get("/user/:id", handleGetSingleUser);
module.exports = router;
