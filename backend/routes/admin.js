const express = require('express');
const router = express.Router();
const Event = require("../models/Events.js");
const Job = require('../models/Job.js');
const User = require('../models/User.js');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const sendMail = require('../utils/mailer');

router.get('/requests', auth, isAdmin, async (req, res) => {
  try {
    const requests = await User.find({ role: 'alumni', approved: false }).select('-password');
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/approve/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.approved = true;
    await user.save();

    try {
      await sendMail({
        to: user.email,
        subject: 'Your alumni registration is approved',
        text: `Hello ${user.name},\n\nYour alumni account has been approved. You can now log in.`
      });
    } catch (mailErr) {
      console.error('Mail error', mailErr.message);
    }

    res.json({ message: 'User approved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/reject/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.findByIdAndDelete(req.params.id);

    try {
      await sendMail({
        to: user.email,
        subject: 'Your alumni registration is rejected',
        text: `Hello ${user.name},\n\nYour registration was rejected by admin.`
      });
    } catch (mailErr) {
      console.error('Mail error', mailErr.message);
    }

    res.json({ message: 'User rejected and removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/send-mail', auth, isAdmin, async (req, res) => {
  try {
    const { subject, text, html } = req.body;
    if (!subject || (!text && !html)) return res.status(400).json({ message: 'Provide subject and text/html' });

    const alumni = await User.find({ role: 'alumni', approved: true }).select('email name');
    if (!alumni.length) return res.status(400).json({ message: 'No approved alumni to send to' });

    for (const person of alumni) {
      try {
        await sendMail({ to: person.email, subject, text, html });
      } catch (err) {
        console.error('Failed sending to', person.email, err.message);
      }
    }

    res.json({ message: 'Emails dispatched (attempted)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/add-event", async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newEvent = new Event({ title, description, date });
    await newEvent.save();

    // send email to all approved alumni
    const alumni = await User.find({ role: "alumni", approved: true });

    alumni.forEach(a => {
      sendMail(a.email, `New Event: ${title}`, description);
    });

    res.json({ message: "Event added & emails sent" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add-job", async (req, res) => {
  try {
    const { role, company, description, link } = req.body;

    const newJob = new Job({ role, company, description, link });
    await newJob.save();

    res.json({ message: "Job posted" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
