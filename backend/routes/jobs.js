const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// GET ALL JOBS
router.get("/", async (req, res) => {
  const { search, location, type } = req.query;

  let filter = {};

  if (search) {
    filter.role = { $regex: search, $options: "i" };
  }

  if (location) {
    filter.location = location;
  }

  if (type) {
    filter.type = type;
  }

  const jobs = await Job.find(filter).sort({ createdAt: -1 });
  res.json(jobs);
});

// POST JOB (Admin)
router.post("/", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

module.exports = router;