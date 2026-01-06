const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const Student = require("../models/Student");

// GET /student/:regno
router.get("/:regno", async (req, res) => {
  const regno = req.params.regno;
  try {
    const student = await Student.findOne({ regno });
    if (!student) return res.json({ status: false, message: "Student not found" });
    return res.json({ status: true, name: student.name });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error" });
  }
});

//  Add student
router.post("/add", async (req, res) => {
  try {
    const { regno, dob, name } = req.body;

    const student = new Student({ regno, dob, name });
    await student.save();

    res.json({ status: true, message: "Student added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Error adding student" });
  }
});
// POST /student/addresult
router.post("/addresult", async (req, res) => {
  try {
    const { regno, semester, subjects } = req.body;

    const result = new Result({ regno, semester, subjects });
    await result.save();

    res.json({ status: true, message: "Result added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Error adding result" });
  }
});

//  Get student result
router.post("/result", async (req, res) => {
  const { regno, dob } = req.body;

  try {
    const student = await Student.findOne({ regno, dob });
    if (!student) {
      return res.json({ status: false, message: "Invalid Register Number or DOB" });
    }

    const result = await Result.findOne({ regno });
    if (!result) {
      return res.json({ status: false, message: "Result not found" });
    }

    return res.json({
      status: true,
      name: student.name,
      semester: result.semester,
      subjects: result.subjects
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
});

module.exports = router;
