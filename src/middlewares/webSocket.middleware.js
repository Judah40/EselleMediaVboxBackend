const jwt = require("jsonwebtoken");

const authenticateWebSocketUser = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("No token provided"));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return next(new Error("Invalid token"));
    }
    return decode;
  });
  socket.user = decoded.id;
  next();
};

module.exports = { authenticateWebSocketUser };
