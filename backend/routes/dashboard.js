const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Event = require("../models/Events");
const Job = require("../models/Job");
const Application = require("../models/Application");

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const alumni = await User.countDocuments({ role: "alumni", approved: true });
    const pending = await User.countDocuments({ role: "alumni", approved: false });
    const events = await Event.countDocuments();
    const jobs = await Job.countDocuments();
    const applications = await Application.countDocuments();

    res.json({
      alumni,
      pending,
      events,
      jobs,
      applications,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;