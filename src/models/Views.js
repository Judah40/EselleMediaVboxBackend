const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../config/database");

const Views = sequelize.define(
  "Views",
  {
    viewId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    videoId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "posts",
        key: "postId",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    viewedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "views",
    timestamps: false,

    // ✅ Define a simple index for query speed (no date functions)
    indexes: [
      {
        fields: ["videoId", "userId", "ipAddress", "viewedAt"],
      },
    ],
  }
);

module.exports = { Views };
