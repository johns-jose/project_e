const express = require("express");
const app = express();
const path = require("path");
const env = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const reportRoute = require("./routes/report");
const saveRoute = require("./routes/save");
const commentRoute = require("./routes/comment");
const chatRoute = require("./routes/chat");
const messageRoute = require("./routes/message");

// middlewears
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(express.static(path.join(__dirname, "uploads")));

// db connection
const connectDB = require("./integration/database");
connectDB();

//dontenv configuration
env.config();

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/report", reportRoute);
app.use("/api/save", saveRoute);
app.use("/api/comment", commentRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log("server run on port 5000");
});
