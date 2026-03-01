const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

/* ==============================
   GET ALL JOBS (Public)
============================== */
router.get("/", async (req, res) => {
  try {
    const { search, location, type } = req.query;
    let filter = {};

    if (search) {
      filter.role = { $regex: search, $options: "i" };
    }

    if (location) filter.location = location;
    if (type) filter.type = type;

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ==============================
   POST JOB (ADMIN ONLY)
============================== */
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    if (!req.body.role || !req.body.company) {
      return res.status(400).json({ message: "Role and company required" });
    }

    const job = new Job(req.body);
    await job.save();

    res.status(201).json(job);

  } catch (err) {
    res.status(400).json({ message: "Failed to create job" });
  }
});

/* ==============================
   APPLY FOR JOB
============================== */
router.post("/apply/:jobId", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existing = await Application.findOne({
      jobId: req.params.jobId,
      email: req.user.email,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = new Application({
      jobId: req.params.jobId,
      name: req.user.name,
      email: req.user.email,
      phone: req.body.phone,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter,
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
/* ==============================
   DELETE JOB (Admin Only)
============================== */
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Job not found" });

    res.json({ message: "Job deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;