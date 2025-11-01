const bcrypt = require("bcrypt");
const User = require("../models/user.schema");
const jwt = require("jsonwebtoken");
const Class = require("../models/class.schema");

exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exist",
      });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.json({
          success: false,
          message: "Error while hasing the pass",
        });
      }

      const newUser = new User({
        fullname,
        email,
        password: hash,
        role,
      });

      const savedUser = await newUser.save();
      return res.json({
        success: true,
        savedUser,
        message: "User registered successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while registering the user",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({
        success: false,
        message: "User doesnot exist",
      });
    }

    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (err) {
        return res.json({
          success: false,
          message: "Error while comapiring the password",
        });
      }

      if (!result) {
        return res.json({
          success: false,
          message: "Wrong password",
        });
      }

      const token = jwt.sign(
        {
          _id: existingUser._id,
          fullname: existingUser.fullname,
          email: existingUser.email,
          role: existingUser.role,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        success: true,
        message: "Login successful",
        user: {
          _id: existingUser._id,
          fullname: existingUser.fullname,
          email: existingUser.email,
          role: existingUser.role,
        },
        token,
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while logggin in the user",
    });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { classID, studentID } = req.body;
    const attendedStudent = await Class.find({
      total_students: { $in: [studentID] },
    });
    console.log(attendedStudent);
    if (attendedStudent.length > 0) {
      return res.json({
        success: false,
        message: "You are already present",
      });
    }
    const currClass = await Class.findByIdAndUpdate(
      classID,
      {
        $push: { total_students: studentID },
      },
      { new: true }
    );
    return res.json({ message: "Attendance Marked", currClass, success: true });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while marking attendance",
      success: false,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    return res.json({
      data: user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while getting the user",
      success: false,
    });
  }
};
