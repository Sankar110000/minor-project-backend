const {
  createNewClass,
  getCurrentClass,
} = require("../controllers/class.controller");

const classRouter = require("express").Router();

classRouter.post("/create", createNewClass);
classRouter.post("/getCurrClass", getCurrentClass);

module.exports = classRouter;
