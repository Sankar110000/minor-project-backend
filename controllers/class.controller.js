const Class = require("../models/class.schema");

exports.createNewClass = async (req, res) => {
  try {
    const { title, classTeacher, endTime } = req.body;
    const onGoingClass = await Class.findOne({
      title,
      startTime: { $lte: new Date(Date.now()) },
      endTime: { $gt: new Date(Date.now()) },
    });

    if (onGoingClass) {
      return res.json({
        success: false,
        message: "Class is already ongoing",
      });
    }

    const newClass = new Class({
      title,
      classTeacher,
      endTime,
    });

    const savedClass = await newClass.save();

    console.log(savedClass);
    return res.json({
      success: true,
      message: "New class created",
      savedClass,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while creating a class",
      success: false,
    });
  }
};

exports.getCurrentClass = async (req, res) => {
  try {
    const { teacherID } = req.body;
    const currClass = await Class.findOne({
      classTeacher: teacherID,
      startTime: { $lte: new Date(Date.now()) },
      endTime: { $gt: new Date(Date.now()) },
    });
    if (currClass) {
      return res.json({
        message: "A class is going on",
        currClass,
        success: true,
      });
    }
    return res.json({
      message: "No class is going on",
      success: false,
    });
  } catch (error) {
    console.log("Error while getting the information", error);
    return res.json({
      message: "Error while getting the information",
      success: false,
    });
  }
};

exports.getPresentStudentDetails = async (req, res) => {
  try {
    const { classID } = req.body;

    const currClass = await Class.findById(classID);
    return res.json({
      total_students: currClass.total_students,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while egtting the data",
      success: false,
    });
  }
};

exports.getPrevoiusClass = async (req, res) => {
  try {
    const { teacherID } = req.body;
    const classes = await Class.find({
      classTeacher: teacherID,
    });
    return res.json({
      classes,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: "Error while getting the deatils",
      success: false,
    });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({});
    return res.json({
      classes,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while getting all classes",
      success: false,
    });
  }
};
