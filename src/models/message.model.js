const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const Messages = sequelize.define(
  "message",
  {
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "message",
  }
);

module.exports = { Messages };
