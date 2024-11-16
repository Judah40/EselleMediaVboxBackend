const express = require("express");
const app = express();
const http = require("http");
const {
  requireAuthenticatedUser,
  requireAdminPriviledge,
} = require("./middlewares/auth.middleware");
const cors = require("cors");
const userRoute = require("./routes/UserRoute/userRoute");
const postRoute = require("./routes/PostRoute/postRoute");
const streamRoute = require("./routes/StreamRoute/streamRoute");
const liveStreamRoute = require("./routes/LiveStreamDataRoute/LiveStreamDataRoute");
const commentRoute = require("./routes/CommentRoute/userComment");
const AdminUserRoute = require("./routes/AdminRoute/UserRoute/userRoute");
const {
  authenticateWebSocketUser,
} = require("./middlewares/webSocket.middleware");
const { nms } = require("./config/mediaServer.config");
const { Server } = require("socket.io");
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", userRoute); // middleware to use the userRoute
app.use("/api/v1/post", requireAuthenticatedUser, postRoute);
app.use("/api/v1/stream", requireAdminPriviledge, streamRoute);
app.use("/api/v1/live", requireAuthenticatedUser, liveStreamRoute);
app.use("/api/v1/comment", requireAuthenticatedUser, commentRoute);
app.use("/api/v1/admin", requireAdminPriviledge, AdminUserRoute);
const server = http.createServer(app);
const socketIo = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  },
});
socketIo.use(authenticateWebSocketUser);
socketIo.on("connection", (socket) => {
  console.log("user connected", socket.user.id);
  // io.emit("receive_message", data); // Change to socket.broadcast.emit for room-specific messages

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.user.id);
  });
});

nms.run();
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
    status: 404,
  });
});

module.exports = server;
