require("dotenv").config;
const app = require("./index");
const {connectDB} = require("./config/database");
const User = require("./models/user.model");

const startServer = async () => {
  connectDB(app);
};

startServer();
