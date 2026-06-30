const express = require("express");
const router = express.Router();

const Faculty = require("../models/Faculty");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ createdAt: -1 });
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty member not found" });
    }
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const { name, title, department, email, bio, image } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const existing = await Faculty.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Faculty member already exists" });
    }

    const faculty = new Faculty({
      name,
      title,
      department,
      email,
      bio,
      image,
    });

    await faculty.save();
    res.status(201).json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const deleted = await Faculty.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Faculty member not found" });
    }
    res.json({ message: "Faculty member removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
