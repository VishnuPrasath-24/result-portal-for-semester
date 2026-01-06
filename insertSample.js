const mongoose = require("mongoose");
const Student = require("./models/Student");
const Result = require("./models/Result");

mongoose.connect("mongodb://localhost:27017/users").then(async () => {
  await Student.deleteMany({});
  await Result.deleteMany({});

  await Student.create({
    regno: "202501001",
    name: "Vishnu",
    dob: "2005-06-15"
  });

  await Result.create({
    regno: "202501001",
    semester: "Semester 1",
    subjects: [
      { code: "MA8151", name: "Engineering Mathematics", grade: "A", pass: true },
      { code: "PH8151", name: "Engineering Physics", grade: "B", pass: true },
      { code: "GE8151", name: "Problem Solving", grade: "U", pass: false }
    ]
  });

  console.log("Sample data inserted");
  mongoose.disconnect();
});
