const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const Live = sequelize.define(
  "live",
  {
    liveId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    likeCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    commentCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Live",
  }
);

module.exports = { Live };
