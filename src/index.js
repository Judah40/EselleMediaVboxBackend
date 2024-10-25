const express = require("express");
const app = express();
const { requireAuthenticatedUser } = require("./middlewares/auth.middleware");

const userRoute = require("./routes/UserRoute/userRoute");
app.use(express.json());

module.exports = app;

app.use("/api/v1/auth", userRoute); // middleware to use the userRoute
