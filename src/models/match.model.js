const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const Match = sequelize.define(
  "match",
  {
    channelId: {
      // Changed from streamName to channelId
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "channels",
        key: "channelId",
      },
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    streamId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
    },
    banner: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isLive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "match",
  }
);

module.exports = { Match };
