const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const bodyparser = require("body-parser");

const http = require("http");
const path = require("path");
const socketController = require("./controllers/socketController");
const scheduleInactiveUserDeletion = require("./custom/deleteInactiveUsers");

scheduleInactiveUserDeletion();

dotenv.config();

const app = express();

const server = http.createServer(app);

const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

socketController(io);

app.use(bodyparser.json());
app.use(cors());
app.use(express.json());

connectDB();

app.use("/", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
