const express = require("express");
const router = express.Router();
const Event = require("../models/Events.js");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
