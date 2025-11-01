const Class = require("../models/class.schema");

exports.createNewClass = async (req, res) => {
  try {
    const { title, classTeacher, expiresAt } = req.body;
    const existingClass = await Class.findOne({ title });

    if (existingClass) {
      return res.json({
        success: false,
        message: "Class is already ongoing",
      });
    }

    const newClass = new Class({
      title,
      classTeacher,
      expiresAt,
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
    console.log(req.body);
    const { teacherID } = req.body;
    const currClass = await Class.findOne({ classTeacher: teacherID });
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
