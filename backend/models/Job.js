const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Internship", "Remote"],
  },
  salary: String,
  description: String,
  skills: [String],
  link: String,
  postedBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", jobSchema);