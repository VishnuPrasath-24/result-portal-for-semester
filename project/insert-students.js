const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Student = require("./models/Student"); // Adjust path if needed

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log(" MongoDB connected");

    try {
      // Path to students.json
      const jsonPath = path.join(__dirname, "students.json");

      // Check if file exists
      if (!fs.existsSync(jsonPath)) {
        console.error(" students.json file not found.");
        mongoose.disconnect();
        return;
      }

      // Read and parse JSON file
      const data = fs.readFileSync(jsonPath, "utf8");
      const studentList = JSON.parse(data);

      // Optional: Clean previous entries (if needed)
      // await Student.deleteMany({});

      // Insert new students
      await Student.insertMany(studentList);
      console.log(" Students inserted successfully!");
    } catch (err) {
      console.error(" Error during insert:", err.message);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });
