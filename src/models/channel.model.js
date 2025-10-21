const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const Channel = sequelize.define(
  "channel",
  {
    channelId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
    },
    channelName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    channelLogo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastBroadcast: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    lastTotalViewers: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isLive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
    modelName: "channel",
  }
);

module.exports = { Channel };
