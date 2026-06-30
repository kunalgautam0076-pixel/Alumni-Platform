const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendMail = require('../utils/mailer');

/* =========================================
   REGISTER
========================================= */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, bio, education, workplace, achievements } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email and password required' });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashed,
      bio,
      education,
      workplace,
      achievements,
      approved: false
    });

    await user.save();

    return res.status(201).json({
      message: 'Registration request submitted. Wait for admin approval.'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* =========================================
   LOGIN
========================================= */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.role === 'alumni' && !user.approved) {
      return res.status(403).json({
        message: 'Your account is not yet approved by an admin.'
      });
    }

    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* =========================================
   CREATE ADMIN (Testing Only)
========================================= */
router.post("/create-admin", async (req, res) => {
  try {
    const hashed = await bcrypt.hash("12345600", 10);

    const admin = new User({
      name: "Super Admin",
      email: "kunal55@gmail.com",
      password: hashed,
      role: "admin",
      approved: true,
    });

    await admin.save();

    res.json({ message: "Admin created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating admin" });
  }
});

/* =========================================
   FORGOT PASSWORD
========================================= */
router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token and save in DB
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    await sendMail({
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset.\n\nClick here:\n${resetUrl}\n\nThis link expires in 15 minutes.`,
    });

    res.json({ message: "Password reset link sent to email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================
   RESET PASSWORD
========================================= */
router.post("/reset-password/:token", async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;