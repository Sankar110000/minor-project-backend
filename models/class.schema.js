const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total_students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  startTime: {
    type: Date,
    default: Date.now(),
  },
  endTime: {
    type: Date,
  },
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
