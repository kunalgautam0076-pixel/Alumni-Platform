const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, default: "Faculty" },
  department: { type: String, default: "Department" },
  email: { type: String, required: true, unique: true, lowercase: true },
  bio: { type: String, default: "" },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Faculty", facultySchema);
