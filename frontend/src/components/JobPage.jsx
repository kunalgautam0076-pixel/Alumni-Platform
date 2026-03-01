import React, { useEffect, useState } from "react";
import "./jobpage.css";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  coverLetter: "",
  resume: null,
});



  useEffect(() => {
    fetch(
      `http://localhost:5000/api/jobs?search=${search}&location=${location}&type=${type}`
    )
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log(err));
  }, [search, location, type]);


  {selectedJob && (
  <div className="apply-modal">
    <div className="modal-content">
      <h2>Apply for {selectedJob.role}</h2>

      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Phone"
        onChange={(e) =>
          setFormData({ ...formData, phone: e.target.value })
        }
      />

      <textarea
        placeholder="Cover Letter"
        onChange={(e) =>
          setFormData({ ...formData, coverLetter: e.target.value })
        }
      />

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) =>
          setFormData({ ...formData, resume: e.target.files[0] })
        }
      />

      <div className="modal-actions">
        <button onClick={() => setSelectedJob(null)}>
          Cancel
        </button>

        <button
          onClick={async () => {
            const data = new FormData();
            data.append("jobId", selectedJob._id);
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("coverLetter", formData.coverLetter);
            data.append("resume", formData.resume);

            await fetch(
              "http://localhost:5000/api/applications",
              {
                method: "POST",
                body: data,
              }
            );

            alert("Application Submitted ✅");
            setSelectedJob(null);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

  return (
    <div className="job-page">
      <div className="job-hero">
        <h1>Alumni Career Hub</h1>
        <p>Explore opportunities shared by our alumni network</p>
      </div>

      {/* FILTER SECTION */}
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

      {/* JOB GRID */}
      <div className="job-grid">
        {jobs.length === 0 ? (
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

              <a href={job.link} target="_blank" rel="noreferrer">
                <button
  className="apply-btn"
  onClick={() => setSelectedJob(job)}
>
  Apply Now 🚀
</button>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}