const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const Likes = sequelize.define(
  "likes",
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    like: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    liveId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: "lives",
        key: "liveId",
      },
    },
  },
  {
    sequelize,
    modelName: "Likes",
  }
);

module.exports = { Likes };
