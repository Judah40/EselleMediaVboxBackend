const express = require("express");
const app = express();
const http = require("http");
const {
  requireAuthenticatedUser,
  requireAdminPriviledge,
} = require("./middlewares/auth.middleware");
const cors = require("cors");
const userRoute = require("./modules/Auth/auth.route.js");
const postRoute = require("./modules/video/video.route.js");
const liveStreamRoute = require("./modules/Live/live.route.js");
const AdminUserRoute = require("./routes/AdminRoute/UserRoute/userRoute");
const favoritesRoute = require("./routes/Favorite/favoriteRoute");
const channelRoute = require("./modules/Channel/channel.route.js");
const MyListRoute = require("./modules/MyList/mylist.route.js");
// const matchRoute = require("./routes/matchRoute/match.route.js");
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1/auth", userRoute); // middleware to use the userRoute
app.use("/api/v1/post", postRoute);
app.use("/api/v1/live", liveStreamRoute);
app.use("/api/v1/admin", AdminUserRoute);
app.use("/api/v1/channel", channelRoute);
app.use("/api/v1/favorite", requireAuthenticatedUser, favoritesRoute);
app.use("/api/v1/mylist", requireAuthenticatedUser, MyListRoute);
// app.use("/api/v1/match", matchRoute);
const server = http.createServer(app);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
    status: 404,
  });
});

module.exports = server;

// FaTe0JsAgDdNNbSt
