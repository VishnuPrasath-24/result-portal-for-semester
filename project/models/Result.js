const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  regno: String,
  semester: String,
  subjects: [
    {
      subjectCode: String,
      subjectName: String,
      grade: String,
      result: String
    }
  ]
});

module.exports = mongoose.model("Result", resultSchema);
