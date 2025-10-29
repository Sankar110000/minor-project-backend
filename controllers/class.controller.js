const Class = require("../models/class.schema");

exports.createNewClass = async (req, res) => {
  try {
    console.log(req.body);
    const { title, classTeacher, endTime } = req.body;
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
