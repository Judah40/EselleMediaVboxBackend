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
const messageRoute = require("./routes/MessageRoute/messageRoute");
const favoritesRoute = require("./routes/Favorite/favoriteRoute");
const {
  authenticateWebSocketUser,
} = require("./middlewares/webSocket.middleware");
const { Server } = require("socket.io");
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", userRoute); // middleware to use the userRoute
app.use("/api/v1/post", postRoute);
app.use("/api/v1/stream", requireAdminPriviledge, streamRoute);
app.use("/api/v1/live", liveStreamRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/admin", AdminUserRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/favorite", requireAuthenticatedUser, favoritesRoute);
const server = http.createServer(app);
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
    status: 404,
  });
});

module.exports = server;
