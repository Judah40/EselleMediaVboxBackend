// import { chatclient } from "../../config/streamio.config";
// import UserModel from "../../models/user.model";
// import { getFileUrl, updateFile, uploadFile } from "../../services/supabase";
// import { handleHashPassword } from "../../utils/generators/hashPassword";
// import { generateOTP } from "../../utils/generators/OTPgenerator";

const { chatclient } = require("../../config/streamio.config");
const UserModel = require("../../models/user.model");
const {
  getFileUrl,
  updateFile,
  uploadFile,
} = require("../../services/supabase");
const { handleHashPassword } = require("../../utils/generators/hashPassword");
const { generateOTP } = require("../../utils/generators/OTPgenerator");
const bcrypt = require("bcrypt");
const {
  generateUsersJwtAccessToken,
} = require("../../utils/generators/tokenGenerator");
exports.getUserByPrimaryKeyService = async (id) => {
  const user = await UserModel.findByPk(id, {
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "isDeleted", "otp"],
    },
  });

  if (!user) {
    throw new Error("USER NOT FOUND");
  }

  return user;
};

exports.updateUserProfileService = async ({ payload, id }) => {
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
    throw new Error("USER NOT FOUND");
  }
  await UserModel.update(
    {
      firstName: payload.firstName || user.firstName,
      middleName: payload.middleName || user.middleName,
      lastName: payload.lastName || user.lastName,
      username: payload.username || user.username,
      email: payload.email || user.email,
      phoneNumber: payload.phoneNumber || user.phoneNumber,
      address: payload.address || user.address,
      gender: payload.payload.gender || user.gender,
      dateOfBirth: dateOfBirth || user.dateOfBirth,
    },
    { where: { id: id } }
  );
};

exports.uploadUserProfilePicture = async (buffer, mimetype, id) => {
  const { path, url } = await uploadFile(buffer, mimetype, "profiles/");

  // Save path in DB (not the URL, since URL can change if policies change)
  await UserModel.update({ profile_picture: path }, { where: { id } });
  return url;
};

exports.getUserProfilePictureService = async (id) => {
  const profilePicture = await UserModel.findOne({ where: { id: id } });
  if (!profilePicture) {
    throw new Error("NO PROFILE PICTURE FOUND PLEASE UPLOAD A PHOTO");
  }
  const profilePictureUrl = await getFileUrl(profilePicture.profile_picture);
  return profilePictureUrl;
};

exports.updateUserProfilePictureService = async (mimetype, buffer, id) => {
  const { profile_picture } = await UserModel.findOne({ id });
  if (!profile_picture) {
    throw Error("NO PROFILE PICTURE FOUND PLEASE UPLOAD A PHOTO");
  }

  await updateFile(profile_picture, buffer, mimetype, "profiles/");
};

exports.addUserProfileService = async (payload) => {
  //CHECK IF USER EXISTS

  const user = await UserModel.findOne({
    where: { email: payload.email },
  });

  if (user) {
    throw new Error("USER ALREADY EXISTS");
  }
  //GENERATE OTP
  const otp = generateOTP();

  //CREATE NEW USER
  await UserModel.create({
    firstName: payload.firstName,
    middleName: payload.middleName,
    lastName: payload.lastName,
    username: payload.username,
    dateOfBirth: payload.dateOfBirth,
    gender: payload.gender,
    email: payload.email,
    address: payload.address,
    phoneNumber: payload.phoneNumber,
    otp: otp,
  });

  //   if (!newUser) {
  //       throw new Error("UNABLE TO CREATE USER")
  //     }
  //       await TwilioClient.messages
  //         .create({
  //           body: `Your verification code is ${otp}. It is valid for the next 10 minutes.`,
  //           from: "+12314403488",
  //           to: phoneNumber,
  //         })
  //         .then((message) => console.log(`OTP sent! SID: ${message.sid}`))
  //         .catch((error) => console.log("Error sending OTP:", error));
};

exports.passwordSetupService = async (password, id) => {
  const user = await UserModel.findByPk(id);
  if (!user) {
    throw new Error("USER NOT FOUND");
  }
  const hashPassword = await handleHashPassword(password);
  await user.update({ isActive: true, password: hashPassword }, { new: true });
};

exports.otpVerificationService = async (OTP) => {
  const user = await UserModel.findOne({ where: { otp: OTP.toString() } });

  if (!user) {
    throw new Error("INVALID OTP. PLEASE TRY AGAIN WITH A VALID OTP");
  }

  await user.update({ otp: "" }, { new: true });

  const userId = user.id;
  const token = generateUsersJwtAccessToken(userId);
  return token;
};

exports.userLoginService = async (email, password) => {
  const user = await UserModel.findOne({ where: { email: email } });
  if (!user) {
    throw new Error("INVALID EMAIL");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("PASSWORD IS INVALID.");
  }

  const userToUpsert = {
    id: String(user.id),
    name: user.firstName,
    role: user.role === "Admin" ? "admin" : "user", // This role is crucial for permissions
  };

  await chatclient.upsertUsers([userToUpsert]);
  const streamToken = chatclient.createToken(String(user.id));
  const token = generateUsersJwtAccessToken(user.id, user.role);
  return {
    streamToken,
    token,
    role: user.role,
  };
};
