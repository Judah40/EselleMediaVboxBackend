require("dotenv").config();
const app = require("./index");
const { connectDB } = require("./config/database");
const User = require("./models/user.model");
const Post = require("./models/post.model");
const channel = require("./models/channel.model");
const like = require("./models/like.model");
const favorites = require("./models/favorite.model");
const Match = require("./models/match.model");
const startServer = async () => {
  connectDB(app);
};

startServer();
