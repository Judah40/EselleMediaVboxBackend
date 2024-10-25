const bcrypt = require("bcrypt");

const handleHashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

module.exports = { handleHashPassword };
