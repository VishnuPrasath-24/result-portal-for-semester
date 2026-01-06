const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  regno: String,
  name: String,
  dob: String // format: "yyyy-mm-dd"
});

module.exports = mongoose.model("Student", studentSchema);
