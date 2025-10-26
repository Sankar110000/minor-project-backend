const express = require("express");
const userRouter = require("./routes/user.routes");
const cors = require("cors");
const classRouter = require("./routes/class.routes");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/class", classRouter);

app.get("/", (req, res) => {
  res.json({ messgae: "working" });
});

module.exports = app;
