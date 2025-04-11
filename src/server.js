require("dotenv").config();
const app = require("./index");
const { connectDB } = require("./config/database");
const User = require("./models/user.model");
const Post = require("./models/post.model");
const Live = require("./models/live.model");
const Comment = require("./models/comment.model");
const like = require("./models/like.model");
const message = require("./models/message.model");
const favorites = require("./models/favorite.model");
const ChannelList = require("./models/channelList.model");
const startServer = async () => {
  connectDB(app);
};

startServer();
