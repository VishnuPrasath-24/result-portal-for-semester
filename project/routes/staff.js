const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const Student = require("../models/Student");

router.post("/result", async (req, res) => {
  try {
    console.log("/fronted api call")
    const { regno, semester, subjects } = req.body;

    const student = await Student.findOne({ regno });
    if (!student) {
      return res.status(404).json({ status: false, message: "Student not found" });
    }
    const newResult = new Result({
      regno,
      name: student.name,
      semester,
      subjects
    });

    await newResult.save();
    res.json({ status: true, message: "Result saved successfully" });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ status: false, message: "Server error" });
  }
});

module.exports = router;
