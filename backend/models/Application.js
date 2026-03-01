const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  name: String,
  email: String,
  phone: String,
  resume: String,
  coverLetter: String,
  appliedAt: {
    type: Date,
    default: Date.now,
    
  },
  
});
applicationSchema.index({ jobId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);