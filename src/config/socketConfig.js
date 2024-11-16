const { Server } = require("socket.io");
const server = require("../index");
const { authenticateWebSocketUser } = require("../middlewares/webSocket.middleware");
const socketIo = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
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

module.exports = { socketIo };
