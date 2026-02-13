const express = require("express");
const router = express.Router();

const Event = require("../models/Events");
const Job = require("../models/Job");
const User = require("../models/User");

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

const sendMail = require("../utils/mailer");

/* ========================================
   GET PENDING ALUMNI REQUESTS
======================================== */
router.get("/requests", auth, isAdmin, async (req, res) => {
  try {
    const requests = await User.find({
      role: "alumni",
      approved: false,
    }).select("-password");

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ========================================
   APPROVE ALUMNI
======================================== */
router.post("/approve/:id", auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.approved = true;
    await user.save();

    try {
      await sendMail({
        to: user.email,
        subject: "Alumni Registration Approved 🎉",
        text: `Hello ${user.name},\n\nYour alumni account has been approved. You can now log in.`,
      });
    } catch (mailErr) {
      console.error("Mail error:", mailErr.message);
    }

    res.json({ message: "User approved successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ========================================
   REJECT ALUMNI
======================================== */
router.post("/reject/:id", auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(req.params.id);

    try {
      await sendMail({
        to: user.email,
        subject: "Alumni Registration Rejected",
        text: `Hello ${user.name},\n\nYour registration was rejected by admin.`,
      });
    } catch (mailErr) {
      console.error("Mail error:", mailErr.message);
    }

    res.json({ message: "User rejected and removed" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ========================================
   SEND BULK MAIL TO ALL APPROVED ALUMNI
======================================== */
router.post("/send-mail", auth, isAdmin, async (req, res) => {
  try {
    const { subject, text, html } = req.body;

    if (!subject || (!text && !html)) {
      return res
        .status(400)
        .json({ message: "Provide subject and text or html" });
    }

    const alumni = await User.find({
      role: "alumni",
      approved: true,
    }).select("email name");

    if (!alumni.length) {
      return res.status(400).json({ message: "No approved alumni found" });
    }

    for (const person of alumni) {
      try {
        await sendMail({
          to: person.email,
          subject,
          text,
          html,
        });
      } catch (err) {
        console.error("Mail failed:", person.email);
      }
    }

    res.json({ message: "Bulk emails sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ========================================
   CREATE EVENT (ADMIN ONLY)
======================================== */
router.post("/add-event", auth, isAdmin, async (req, res) => {
  try {
    const { title, description, date, location, image } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date required" });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      image,
    });

    await newEvent.save();

    // Send email to approved alumni
    const alumni = await User.find({
      role: "alumni",
      approved: true,
    }).select("email name");

    for (const person of alumni) {
      try {
        await sendMail({
          to: person.email,
          subject: `New Event: ${title}`,
          text: `Hello ${person.name},\n\nA new event "${title}" has been announced.\n\n${description}`,
        });
      } catch (err) {
        console.error("Mail error:", person.email);
      }
    }

    res.status(201).json({
      message: "Event created and notifications sent",
      event: newEvent,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ========================================
   CREATE JOB (ADMIN ONLY)
======================================== */
router.post("/add-job", auth, isAdmin, async (req, res) => {
  try {
    const { role, company, description, link } = req.body;

    if (!role || !company) {
      return res.status(400).json({
        message: "Role and company required",
      });
    }

    const newJob = new Job({
      role,
      company,
      description,
      link,
    });

    await newJob.save();

    res.status(201).json({
      message: "Job posted successfully",
      job: newJob,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
