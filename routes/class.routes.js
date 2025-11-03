const {
  createNewClass,
  getCurrentClass,
  getPrevoiusClass,
  getAllClasses,
} = require("../controllers/class.controller");

const classRouter = require("express").Router();

classRouter.post("/create", createNewClass);
classRouter.post("/getCurrClass", getCurrentClass);
classRouter.post("/getPrevoiusClass", getPrevoiusClass);
classRouter.post("/getAllClasses", getAllClasses);

module.exports = classRouter;
