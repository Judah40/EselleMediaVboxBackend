const express = require("express");
const router = express.Router();
const {
  requireAuthenticatedUser,
} = require("../../middlewares/auth.middleware");
//CONTROLLER IMPORTS
const {
  handleRegisterUserController,
  handleLoginUserController,
  handleAuthenticateUserController,
  handleUpdateUserProfileController,
  handlegGetUserProfileController,
  handlePasswordSetupController,
  handleOTPverificationController,
  handleUploadProfilePictureController,
  handleDeleteProfilePicController,
  handleUpdateProfilePicController,
  handleGetProfilePictureController,
} = require("../../controllers/userController");
//VALIDATORS IMPORTS
const {
  userDetailsValidator,
  userPasswordValidator,
  userLoginValidator,
} = require("../../utils/validators/userValidatorSchema");

const { handleUploadImage } = require("../../utils/File/imageUploader");
///////////////////////////////////////////////////////////////////////////////////////////
//OTP VERIFICATION ROUTE
router.post("/verify-OTP", handleOTPverificationController);
///////////////////////////////////////////////////////////////////////////////////////////
//SETUP PASSWORD ROUTE
router.post(
  "/password-setup",
  userPasswordValidator,
  requireAuthenticatedUser,
  handlePasswordSetupController
);
///////////////////////////////////////////////////////////////////////////////////////////
//REGISTER USER ROUTE
router.post("/register", userDetailsValidator, handleRegisterUserController);
///////////////////////////////////////////////////////////////////////////////////////////
//LOGIN USER
router.post("/login",  handleLoginUserController);
///////////////////////////////////////////////////////////////////////////////////////////
//AUTHENTICATE USER
router.post(
  "/authenticate",
  requireAuthenticatedUser,
  handleAuthenticateUserController
);
///////////////////////////////////////////////////////////////////////////////////////////
//GET USER PROFILE
router.get(
  "/profile",
  requireAuthenticatedUser,
  handlegGetUserProfileController
);
///////////////////////////////////////////////////////////////////////////////////////////
//edit user profile
router.put(
  "/profile",
  requireAuthenticatedUser,
  handleUpdateUserProfileController
);
///////////////////////////////////////////////////////////////////////////////////////////
//UPLOAD PROFILE PICTURE
router.post(
  "/profile-picture",
  handleUploadImage,
  requireAuthenticatedUser,
  handleUploadProfilePictureController
);
///////////////////////////////////////////////////////////////////////////////////////////
//GET PROFILE  PICTURE
router.get(
  "/profile-picture",
  requireAuthenticatedUser,
  handleGetProfilePictureController
);
///////////////////////////////////////////////////////////////////////////////////////////
//DELETE PICTURE
router.delete("/profile-picture", handleDeleteProfilePicController);
///////////////////////////////////////////////////////////////////////////////////////////
//UPDATE PICTURE
router.put(
  "/profile-picture/update",
  requireAuthenticatedUser,
  handleUploadImage,
  handleUpdateProfilePicController
);



///////////////////////////////////////////////////////////////////////////////////////////
//GET ALL USERS PROFILE ROUTE


module.exports = router;
