const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const vodComment = sequelize.define(
  "vodcomments",
  {
    vodId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: "posts",
        key: "postId",
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
    modelName: "vodcomments",
  }
);

module.exports = { vodComment };
