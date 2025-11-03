const {
  createNewClass,
  getCurrentClass,
  getPrevoiusClass,
} = require("../controllers/class.controller");

const classRouter = require("express").Router();

classRouter.post("/create", createNewClass);
classRouter.post("/getCurrClass", getCurrentClass);
classRouter.post("/getAllClasses", getPrevoiusClass);

module.exports = classRouter;
