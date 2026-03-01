import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./jobpage.css";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    coverLetter: "",
    resume: "",
  });

  /* ===============================
     FETCH JOBS
  =============================== */
  useEffect(() => {
    fetchJobs();
  }, [search, location, type]);

  const fetchJobs = async () => {
  try {
    setLoading(true);
    const res = await api.get(
      `/api/jobs?search=${search}&location=${location}&type=${type}`
    );
    setJobs(res.data);
    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};

  /* ===============================
     HANDLE APPLY
  =============================== */
  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/jobs/apply/${selectedJob._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone: formData.phone,
            coverLetter: formData.coverLetter,
            resume: formData.resume,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Application Submitted ✅");
      setSelectedJob(null);
      setFormData({ phone: "", coverLetter: "", resume: "" });

    } catch (err) {
      alert("Error submitting application");
    }
  };

  return (
    <div className="job-page">
      {/* HERO */}
      <div className="job-hero">
        <h1>Alumni Career Hub</h1>
        <p>Explore opportunities shared by our alumni network</p>
      </div>

      {/* FILTERS */}
      <div className="job-filters">
        <input
          type="text"
          placeholder="Search role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>
      </div>

      {/* JOB LIST */}
      <div className="job-grid">
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="no-jobs">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-top">
                <h2>{job.role}</h2>
                <span className="badge">{job.type}</span>
              </div>

              <h4>{job.company}</h4>
              <p className="location">📍 {job.location}</p>
              <p className="salary">💰 {job.salary}</p>

              <p className="desc">{job.description}</p>

              <div className="skills">
                {job.skills?.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>

              <button
                className="apply-btn"
                onClick={() => setSelectedJob(job)}
              >
                Apply Now 🚀
              </button>
            </div>
          ))
        )}
      </div>

      {/* ===============================
          APPLY MODAL
      =============================== */}
      {selectedJob && (
        <div className="apply-modal">
          <div className="modal-content">
            <h2>Apply for {selectedJob.role}</h2>

            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <textarea
              placeholder="Cover Letter"
              value={formData.coverLetter}
              onChange={(e) =>
                setFormData({ ...formData, coverLetter: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Resume Link (Google Drive / PDF URL)"
              value={formData.resume}
              onChange={(e) =>
                setFormData({ ...formData, resume: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={() => setSelectedJob(null)}>
                Cancel
              </button>

              <button onClick={handleApply}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}