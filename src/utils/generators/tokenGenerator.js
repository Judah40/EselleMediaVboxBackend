const jwt = require("jsonwebtoken");

const generateUsersJwtAccessToken = (user) => {
  const paylod = {
    id: user,
  };
  try {
    return jwt.sign(
      paylod,
      "",
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { generateUsersJwtAccessToken };
