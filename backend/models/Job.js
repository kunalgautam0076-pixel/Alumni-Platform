const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ["Full-Time", "Part-Time", "Internship", "Remote"], required: true },
  salary: String,
  description: String,
  skills: [String],
  link: String,
  postedBy: { type: String }, // alumni name
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);