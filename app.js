const express = require("express");
const userRouter = require("./routes/user.routes");
const cors = require("cors");
const classRouter = require("./routes/class.routes");
const User = require("./models/user.schema");
const Class = require("./models/class.schema");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/class", classRouter);

app.get("/clearDB", async (req, res) => {
  await User.deleteMany({});
  await Class.deleteMany({});
  res.json({ messgae: "Data cleared" });
});

module.exports = app;
