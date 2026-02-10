const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  role: String,
  company: String,
  description: String,
  link: String
});

module.exports = mongoose.model("Job", JobSchema);
