const {
  getUserByPrimaryKeyService,
  updateUserProfileService,
  uploadUserProfilePicture,
  getUserProfilePictureService,
  updateUserProfilePictureService,
  addUserProfileService,
  passwordSetupService,
  otpVerificationService,
  userLoginService,
} = require("./auth.service");
// const sendOTP = require("../utils/sms/sendOTP");
// const { sendSMS } = require("../utils/sms/textBelt");
////////////////////////////////////////////////////////////////////////////
//REGISTER USER CONTROLLER
exports.handleRegisterUserController = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      username,
      dateOfBirth,
      gender,
      email,
      address,
      phoneNumber,
    } = req.body;

    const payload = {
      firstName,
      middleName,
      lastName,
      username,
      dateOfBirth,
      gender,
      email,
      address,
      phoneNumber,
    };

    await addUserProfileService(payload);
    return res.status(201).json({
      message: `User Accout Created Successfully. Verify Account with the following OTP: ${otp}`,
    });
  } catch (error) {
    console.log(error.message[0]);
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
////////////////////////////////////////////////////////////////////////////
//VERIFY OTP CONTROLLER
exports.handleOTPverificationController = async (req, res) => {
  try {
    const { OTP } = req.body;
    const token = await otpVerificationService(OTP);

    res.status(200).json({ message: "Phone Number Verified", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
////////////////////////////////////////////////////////////////////////////
//PASSWORD SETUP CONTROLLER
exports.handlePasswordSetupController = async (req, res) => {
  try {
    const { password } = req.body;
    const { id } = req.user;
    await passwordSetupService(password, id);
    return res.status(201).json({
      message: "password successfully created",
      statusCode: 201,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
////////////////////////////////////////////////////////////////////////////
//USER LOGIN CONTROLLER
exports.handleLoginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const credentials = await userLoginService(email, password);
    res.json({
      message: "Login successful",
      token: credentials.token,
      streamToken: credentials.streamToken,
      userType: credentials.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
////////////////////////////////////////////////////////////////////////////
//USER AUTH CONTROLLER
exports.handleAuthenticateUserController = async (req, res) => {
  try {
    const { id } = req.user;
    if (id) {
      res.status(200).json({
        message: "User authenticated successfully",
        statusCode: 200,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
////////////////////////////////////////////////////////////////////////////
//GET USER PROFILE CONTROLLER
exports.handlegGetUserProfileController = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await getUserByPrimaryKeyService(id);
    res.status(200).json({
      message: "User profile retrieved successfully",
      user: user,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
////////////////////////////////////////////////////////////////////////////
//EDIT USER PROFILE CONTROLLER
exports.handleUpdateUserProfileController = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      username,
      dateOfBirth,
      gender,
      email,
      address,
      phoneNumber,
    } = req.body;
    const { id } = req.user;

    const payload = {
      firstName,
      middleName,
      lastName,
      username,
      dateOfBirth,
      gender,
      email,
      address,
      phoneNumber,
    };
    await updateUserProfileService({ payload, id });

    return res
      .status(200)
      .json({ message: "Profile updated successfully", statusCode: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

////////////////////////////////////////////////////////////////////////////
//HANDLE UPLOAD PROFILE PICTURE
exports.handleUploadProfilePictureController = async (req, res) => {
  try {
    const { mimetype, buffer } = req.file;
    const { id } = req.user;

    await uploadUserProfilePicture(buffer, mimetype, id);
    return res.status(200).json({
      message: "Profile picture uploaded successfully",
      url, // return public URL to frontend
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
////////////////////////////////////////////////////////////////////////////
//HANDLE GET PROFILE PROFILE PICTURE
exports.handleGetProfilePictureController = async (req, res) => {
  try {
    const { id } = req.user;
    const profilePicture = await getUserProfilePictureService(id);
    console.log(profilePicture);
    return res
      .status(200)
      .json({ profilePictureUrl: profilePicture, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
////////////////////////////////////////////////////////////////////////////
//HANDLE UPDATE PROFILE PICTURE
exports.handleUpdateProfilePicController = async (req, res) => {
  try {
    const { mimetype, buffer } = req.file;
    const { id } = req.user;
    await updateUserProfilePictureService(mimetype, buffer, id);
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

////////////////////////////////////////////////////////////////////////////
//HANDLE DELETE PROFILE PICTURE
exports.handleDeleteProfilePicController = async (req, res) => {
  return res.send({
    message: "in development",
  });
  try {
  } catch (error) {}
};
