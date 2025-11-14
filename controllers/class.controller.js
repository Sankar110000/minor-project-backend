const Class = require("../models/class.schema");
const User = require("../models/user.schema");

exports.createNewClass = async (req, res) => {
  try {
    const { title, classTeacher, endTime } = req.body;
    console.log(title, classTeacher, endTime);
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
    })
      .populate("classTeacher")
      .populate("total_students");
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

exports.endClass = async (req, res) => {
  try {
    const { classID } = req.body;
    const updatedClass = await Class.findByIdAndUpdate(classID, {
      endTime: Date.now(),
    });
    if (!updatedClass) {
      return res.json({
        message: "Eror while updating the document",
        success: false,
      });
    }
    return res.json({
      message: "Class ended successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while ending the class",
      success: false,
    });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const { classID } = req.body;
    const currClass = await Class.findOne({ _id: classID }).populate(
      "total_students"
    );
    const students = await User.find({ role: "student" });

    currClass.total_students.forEach((usr) => {
      let id = usr._id;
      students.forEach((stdnt) => {
        if (stdnt._id === id) {
          return { ...stdnt, isPresent: true };
        }
      });
    });

    return res.json({
      message: "Got successfully",
      students: currClass.total_students,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while getting the attendance",
      success: false,
    });
  }
};
