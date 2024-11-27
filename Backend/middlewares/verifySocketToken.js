// middlewares/verifySocketToken.js
require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifySocketToken = (socket, next) => {
  const token = socket.handshake.query.token;

  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (error) {
    next(new Error("Authentication error: Invalid or expired token"));
  }
};

module.exports = verifySocketToken;
