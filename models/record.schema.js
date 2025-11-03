const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      unique: true,
    },
    classes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Class",
      },
    ],
  },
  { timestamps: true }
);
const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
