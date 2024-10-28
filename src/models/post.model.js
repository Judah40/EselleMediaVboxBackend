const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const Post = sequelize.define(
  "post",

  //   {
  //     postId: UUID,            // Unique identifier for the post
  //     userId: UUID,            // Reference to the user who made the post
  //     content: TEXT,           // The text content of the post
  //     mediaUrl: STRING,        // URL to the video (stored in AWS S3)

  //     thumbnailUrl: STRING,    // URL for video thumbnail (if media is a video)
  //     caption: STRING,         // Caption or description of the media (optional)
  //     likesCount: INTEGER,     // Number of likes for the post
  //     commentsCount: INTEGER,  // Number of comments for the post
  //     createdAt: DATE,         // Timestamp of when the post was created
  //   banner:STRING, / // URL to the Banner (stored in AWS S3)
  //     updatedAt: DATE,         // Timestamp of the last update
  //     isPublic: BOOLEAN,       // Whether the post is public or private
  //     tags: ARRAY[STRING],     // Tags related to the post (e.g., hashtags)
  //     location: STRING,        // Optional location data (if the user adds it)
  //     isDeleted: BOOLEAN,      // Soft delete flag
  //   }
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
      type: Sequelize.ARRAY(Sequelize.STRING),
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
