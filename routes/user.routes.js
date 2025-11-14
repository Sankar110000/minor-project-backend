const {
  registerUser,
  loginUser,
  markAttendance,
  getUser,
  getAllUser,
} = require("../controllers/user.controller");
const verifyJWT = require("../middlewares/auth");

const userRouter = require("express").Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/markAttendance", markAttendance);
userRouter.post("/getAllStudents", getAllUser);
userRouter.post("/getUser", verifyJWT, getUser);

module.exports = userRouter;
