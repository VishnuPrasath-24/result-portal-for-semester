const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/users")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo Error", err));

//  Route import
const studentRoutes = require("./routes/student");
const staffRoutes = require("./routes/staff");

//  Route use
app.use("/student", studentRoutes);
app.use("/staff", staffRoutes); 

app.listen(5000, () => console.log("Server started on port 5000"));
