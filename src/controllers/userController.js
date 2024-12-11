const UserModel = require("../models/user.model");
const { generateOTP } = require("../utils/generators/OTPgenerator");
const { handleHashPassword } = require("../utils/generators/hashPassword");
const {
  generateUsersJwtAccessToken,
} = require("../utils/generators/tokenGenerator");
const bcrypt = require("bcrypt");
const {
  handleUploadImageToAWSs3bucket,
  handleGetUploadedMediaFromAWSs3Bucket,
} = require("./awsController");
const { randomName } = require("../utils/generators/generateRandomNames");
const sendOTP = require("../utils/sms/sendOTP");
const { sendSMS } = require("../utils/sms/textBelt");
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
      where: { email: email },
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
      //SEND OTP TO USER
      // await sendOTP(phoneNumber, otp)
      //   .then((message) => {
      //     console.log("Message SID:", message.sid); // Print the message SID for reference
      //   })
      //   .catch((error) => {
      //     console.error("Failed to send OTP:", error);
      //   });
      const message = `Your OTP code is: ${otp}`;
      await sendSMS(phoneNumber, message)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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
    console.log(email);
    const user = await UserModel.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Password is Invalid." });
    }
    const token = generateUsersJwtAccessToken(user.id, user.role);

    res.json({
      message: "Login successful",
      token: token,
      userType: user.role,
    });
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
      attributes: {
        exclude: [
          "password",
          "createdAt",
          "updatedAt",
          "isDeleted",
          "otp",
          "id",
          "role",
        ],
      },
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
    const user = await UserModel.findByPk(id, {
      attributes: {
        exclude: [
          "password",
          "createdAt",
          "updatedAt",
          "isDeleted",
          "otp",
          "id",
          "role",
        ],
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await UserModel.update(
      {
        firstName: firstName || user.firstName,
        middleName: middleName || user.middleName,
        lastName: lastName || user.lastName,
        username: username || user.username,
        email: email || user.email,
        phoneNumber: phoneNumber || user.phoneNumber,
        address: address || user.address,
        gender: gender || user.gender,
        dateOfBirth: dateOfBirth || user.dateOfBirth,
      },
      { where: { id: id } }
    );

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
    console.log(req.file);

    const randomNameValue = randomName(); // Generate the random name once

    await handleUploadImageToAWSs3bucket(randomNameValue, buffer, mimetype)
      .then(async (value) => {
        const updateProfilePic = await UserModel.update(
          {
            profile_picture: randomNameValue,
          },
          { where: { id: id } }
        );
        if (updateProfilePic) {
          return res.status(200).json({
            message: "Profile picture updated successfully",
            status: 200,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
////////////////////////////////////////////////////////////////////////////
//HANDLE GET PROFILE PROFILE PICTURE
exports.handleGetProfilePictureController = async (req, res) => {
  try {
    const { id } = req.user;
    const profilePicture = await UserModel.findOne({ id });
    if (profilePicture) {
      const profilePictureUrl = await handleGetUploadedMediaFromAWSs3Bucket(
        profilePicture.profile_picture
      );
      return res
        .status(200)
        .json({ profilePictureUrl: profilePictureUrl, status: 200 });
      // return res.send({
      //   profilePicture: profilePicture.profile_picture,
      // });
    }
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
    const { profile_picture } = await UserModel.findOne({ id });
    if (profile_picture) {
      await handleUploadImageToAWSs3bucket(profile_picture, buffer, mimetype)
        .then((value) => {
          console.log(value);
          return res.status(200).json({
            message: "Profile picture updated successfully",
            status: 200,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
