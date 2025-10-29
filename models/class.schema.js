const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    reuired: true,
  },
  total_students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  startTime: {
    type: Date,
    default: new Date(Date.now()),
  },
  endTime: {
    type: Date,
    default: new Date(Date.now() + 36000),
    required: true,
  },
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
