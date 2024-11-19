const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const Post = sequelize.define(
  "post",

  {
    postId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    thumbnailUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bannerUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    videoUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    caption: {
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
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    isPublic: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);

module.exports = { Post };
