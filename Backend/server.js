const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const bodyparser = require("body-parser");

dotenv.config();

const app = express();
app.use(bodyparser.json());

const PORT = process.env.PORT || 4000;

app.use(cors());

connectDB();
app.use(express.json());

app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
