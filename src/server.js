require("dotenv").config();
const app = require("./index");
const {connectDB} = require("./config/database");
const User = require("./models/user.model");
const Post = require("./models/post.model")
const Live = require("./models/live.model")
const startServer = async () => {
  connectDB(app);
};

startServer();
