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
  handleResendOTPcontroller,
  handleUpdatepassword,
  handleForgetPasswordController,
  handleResetForgetPasswordController,
} = require("./auth.controller");
//VALIDATORS IMPORTS
const {
  userDetailsValidator,
  userPasswordValidator,
  userLoginValidator,
  userResetForgottenPasswordValidator,
  emailValidator,
} = require("../../utils/validators/userValidatorSchema");

const {
  handleUploadImage,
  uploadProfilePicture,
} = require("../../utils/File/imageUploader");
const {
  userResetPasswordValidator,
} = require("../../utils/validators/password.validator");
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
router.post("/login", handleLoginUserController);
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
  uploadProfilePicture,
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
//RESEND OTP

router.post("/resend-otp", handleResendOTPcontroller);

///////////////////////////////////////////////////////////////////////////////////////////
//RESET PASSWORD
router.patch(
  "/password",
  requireAuthenticatedUser,
  userResetPasswordValidator,
  handleUpdatepassword
);

///////////////////////////////////////////////////////////////////////////////////////////
//FORGET PASSWORD
//step 1
router.post("/forget-password", emailValidator, handleForgetPasswordController);
//step 2
router.patch(
  "/reset-password",
  userResetForgottenPasswordValidator,
  handleResetForgetPasswordController
);
module.exports = router;
