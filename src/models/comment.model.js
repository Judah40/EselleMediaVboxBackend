const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const Comment = sequelize.define(
  "comments",
  {
    liveId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: "lives",
        key: "liveId",
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "comments",
  }
);

module.exports = { Comment };
