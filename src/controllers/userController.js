const UserModel = require("../models/user.model");
const { generateOTP } = require("../utils/generators/OTPgenerator");
const { handleHashPassword } = require("../utils/generators/hashPassword");
const {
  generateUsersJwtAccessToken,
} = require("../utils/generators/tokenGenerator");
const bcrypt = require("bcrypt");
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

    //CHECK IF USER EXISTS
    const user = await UserModel.findOne({
      email: email,
    });

    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    //GENERATE OTP
    const otp = generateOTP();

    //CREATE NEW USER
    const newUser = await UserModel.create({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      username: username,
      dateOfBirth: dateOfBirth,
      gender: gender,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      otp: otp,
    }).catch((error) => {
      console.error("REGISTER USER ERROR: ", error);
      throw error;
    });

    if (newUser) {
      return res.status(201).json({
        message: `User Accout Created Successfully. Verify Account with the following OTP: ${otp}`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
////////////////////////////////////////////////////////////////////////////
//VERIFY OTP CONTROLLER
exports.handleOTPverificationController = async (req, res) => {
  try {
    const { OTP } = req.body;
    const user = await UserModel.findOne({ otp: OTP });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again with a valid OTP" });
    }

    await user.update({ isActive: true, otp: "" }, { new: true });
    const userId = user.id;
    console.log(userId);
    const token = generateUsersJwtAccessToken(userId);

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
    const user = await UserModel.findByPk(id);
    // res.status(200).json({ user });
    const hashPassword = await handleHashPassword(password);
    await user.update({ password: hashPassword }, { new: true });
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
    const user = await UserModel.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Password is Invalid." });
    }
    const token = generateUsersJwtAccessToken(user.id);

    res.json({ message: "Login successful", token });
  } catch (error) {
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
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        statusCode: 404,
      });
    }
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
exports.handleEditUserProfileController = async (req, res) => {};
