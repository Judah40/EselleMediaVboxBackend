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
const { sendOTP } = require("../../utils/Mail/sendOTP");
const { sequelize } = require("../../config/database");

//GET USER BY PRIMARY KEY
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

//UPDATE USER
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

  console.log(user);
  await UserModel.update(
    {
      ...user,
      ...payload,
    },
    { where: { id: id } }
  );
};

//UPLOAD USER PROFILE PICTURE

exports.uploadUserProfilePicture = async (buffer, mimetype, id) => {
  const existingProfilePicture = await UserModel.findByPk(id);
  if (!existingProfilePicture.profile_picture) {
    const { path, url } = await uploadFile(buffer, mimetype, "profiles/");
    // Save path in DB (not the URL, since URL can change if policies change)
    await UserModel.update({ profile_picture: path }, { where: { id } });
    return url;
  }
  const { path, url } = await updateFile(
    existingProfilePicture.profile_picture,
    buffer,
    mimetype,
    "profiles/"
  );

  console.log("existing image", path, url);

  await UserModel.update({ profile_picture: path }, { where: { id } });
  return url;
};

//GET USER PROFILE PICTURE
exports.getUserProfilePictureService = async (id) => {
  const profilePicture = await UserModel.findOne({ where: { id: id } });
  if (!profilePicture) {
    throw new Error("NO PROFILE PICTURE FOUND PLEASE UPLOAD A PHOTO");
  }
  const profilePictureUrl = await getFileUrl(profilePicture.profile_picture);
  return profilePictureUrl;
};

//UPDATE USER PROFILE PICTURE

exports.updateUserProfilePictureService = async (mimetype, buffer, id) => {
  const { profile_picture } = await UserModel.findOne({ id });
  if (!profile_picture) {
    throw Error("NO PROFILE PICTURE FOUND PLEASE UPLOAD A PHOTO");
  }

  await updateFile(profile_picture, buffer, mimetype, "profiles/");
};

//ADD USER SERVICE

exports.addUserProfileService = async (payload) => {
  const transaction = await sequelize.transaction();

  const date = new Date(payload.dateOfBirth);
  try {
    // CHECK IF USER EXISTS
    const existingUser = await UserModel.findOne({
      where: { email: payload.email },
      transaction,
    });

    if (existingUser) {
      await transaction.rollback();
      throw new Error("USER ALREADY EXISTS");
    }

    // GENERATE OTP
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // CREATE NEW USER
    const newUser = await UserModel.create(
      {
        firstName: payload.firstName,
        middleName: payload.middleName,
        lastName: payload.lastName,
        username: payload.username,
        dateOfBirth: date,
        gender: payload.gender,
        email: payload.email,
        address: payload.address,
        phoneNumber: payload.phoneNumber,
        otp: otp,
        otpExpiresAt: otpExpiresAt,
      },
      { transaction }
    );

    if (!newUser) {
      await transaction.rollback();
      throw new Error("USER COULD NOT BE CREATED");
    }

    // SEND OTP
    const sendotp = await sendOTP({
      email: payload.email,
      otpCode: otp,
    });

    if (!sendotp.success) {
      await transaction.rollback();
      throw new Error(sendotp.error || "Failed to send OTP");
    }

    await transaction.commit();

    return {
      success: true,
      userId: newUser.id,
      otpExpiresAt: otpExpiresAt,
      message: "User created successfully. OTP sent to email.",
    };
  } catch (error) {
    await transaction.rollback();
    console.error("User creation failed:", error);
    throw error;
  }
};

//SETUP PASSWORD SERVICE

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

  await user.update({ otp: "", isActive: true }, { new: true });

  const userId = user.id;
  const token = generateUsersJwtAccessToken(userId);
  return token;
};

//USER LOGIN
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

//RESEND OTP

exports.resendOTP = async (email) => {
  const existingUser = await UserModel.findOne({
    where: { email },
  });

  if (!existingUser) throw new Error("USER DOESN'T EXIST");

  if (existingUser.isActive) throw new Error("USER ALREADY VERIFIED");
  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const updateOTP = await existingUser.update(
    { otp, otpExpiresAt },
    { new: true }
  );
  if (!updateOTP) throw new Error("COULD NOT SEND OTP");
  await sendOTP({ email, otpCode: otp });
};
//RESET PASSWORD
exports.resetPassword = async ({ id, oldPassword, newPassword }) => {
  //CHECK IF OLD PASSWORD IS CORRECT
  const existingUser = await UserModel.findOne({
    where: { id },
  });
  if (!existingUser) throw new Error("USER DOESN'T EXIST");
  const isPasswordValid = await bcrypt.compare(
    oldPassword,
    existingUser.password
  );
  if (!isPasswordValid) throw new Error("INVALID PASSWORD");
  const hashPassword = await handleHashPassword(newPassword);
  existingUser.password = hashPassword;

  existingUser.save();
};
