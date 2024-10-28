const express = require("express");
const app = express();
const { requireAuthenticatedUser } = require("./middlewares/auth.middleware");
const cors = require("cors");
const userRoute = require("./routes/UserRoute/userRoute");
const postRoute = require("./routes/PostRoute/postRoute");
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", userRoute); // middleware to use the userRoute
app.use("/api/v1/post", requireAuthenticatedUser, postRoute);
module.exports = app;
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
    status: 404,
  });
});
