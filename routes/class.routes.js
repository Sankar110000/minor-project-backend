const {
  createNewClass,
  getCurrentClass,
  getPrevoiusClass,
  getAllClasses,
  endClass,
  getAttendance,
  getClassById,
} = require("../controllers/class.controller");

const classRouter = require("express").Router();

classRouter.post("/create", createNewClass);
classRouter.post("/getCurrClass", getCurrentClass);
classRouter.post("/getPrevoiusClass", getPrevoiusClass);
classRouter.post("/getAllClasses", getAllClasses);
classRouter.post("/endClass", endClass);
classRouter.post("/getAttendance", getAttendance);
classRouter.get("/getClassById", getClassById);

module.exports = classRouter;
