const express = require("express");
const router = express.Router();
const {
  requireAuthenticatedUser,
} = require("../../middlewares/auth.middleware");
const {
  handleRegisterUserController,
  handleLoginUserController,
  handleAuthenticateUserController,
  handleUpdateUserProfileController,
  handlegGetUserProfileController,
  handlePasswordSetupController,
  handleOTPverificationController,
} = require("../../controllers/userController");

const {
  userDetailsValidator,
  userPasswordValidator,
  userLoginValidator,
} = require("../../utils/validators/userValidatorSchema");

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
//LOGIN USER
router.post("/login", userLoginValidator, handleLoginUserController);
//AUTHENTICATE USER
router.post(
  "/authenticate",
  requireAuthenticatedUser,
  handleAuthenticateUserController
);
//GET USER PROFILE
router.get(
  "/profile",
  requireAuthenticatedUser,
  handlegGetUserProfileController
);
//edit user profile
router.put(
  "/profile",
  requireAuthenticatedUser,
  handleUpdateUserProfileController
);

module.exports = router;
