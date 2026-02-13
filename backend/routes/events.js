const express = require("express");
const router = express.Router();
const Event = require("../models/Events.js");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

/* ===========================
   GET ALL EVENTS (PUBLIC)
=========================== */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   GET SINGLE EVENT (PUBLIC)
=========================== */
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   CREATE EVENT (ADMIN ONLY)
=========================== */
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: "Failed to create event" });
  }
});

/* ===========================
   UPDATE EVENT (ADMIN ONLY)
=========================== */
router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Event not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update event" });
  }
});

/* ===========================
   DELETE EVENT (ADMIN ONLY)
=========================== */
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Event not found" });

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event" });
  }
});

module.exports = router;
