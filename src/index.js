const express = require("express");
const app = express();
const { requireAuthenticatedUser } = require("./middlewares/auth.middleware");

const userRoute = require("./routes/UserRoute/userRoute");
const postRoute = require("./routes/PostRoute/postRoute");
app.use(express.json());

module.exports = app;
// app.use((req, res, next) => {
//   res.status(404).json({
//     message: "Route not found",
//     status: 404,
//   });
// });
app.use("/api/v1/auth", userRoute); // middleware to use the userRoute

app.use("/api/v1/post",requireAuthenticatedUser, postRoute);
