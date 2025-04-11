const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const ChannelList = sequelize.define(
  "ChannelList",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    channelName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    channelId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isLive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "channelList",
  }
);

module.exports = { ChannelList };
