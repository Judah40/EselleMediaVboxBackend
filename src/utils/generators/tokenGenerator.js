const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/default.config");
const generateUsersJwtAccessToken = (user, userRole) => {
  const paylod = {
    id: user,
    role: userRole,
  };
  try {
    return jwt.sign(paylod, jwtSecret, {
      expiresIn: "1d",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { generateUsersJwtAccessToken };
