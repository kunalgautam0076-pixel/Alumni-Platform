const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const upload = require("../middleware/upload");

router.get('/list', async (req, res) => {
  try {
    const alumni = await User.find({ role: 'alumni', approved: true }).select('-password');
    res.json(alumni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user || user.role !== 'alumni' || !user.approved) return res.status(404).json({ message: 'Alumni not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put("/me/update", auth, upload.single("profileImage"), async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      bio: req.body.bio,
      education: req.body.education,
      workplace: req.body.workplace,
      achievements: req.body.achievements,
    };

    if (req.file) {
      updates.profileImage = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
