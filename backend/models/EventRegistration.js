const mongoose = require("mongoose");

const EventRegistrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate registration
EventRegistrationSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model("EventRegistration", EventRegistrationSchema);