const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  type: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Internship", "Remote"]
  },
  salary: String,
  description: String,
  skills: [String],
  link: String,
  postedBy: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);