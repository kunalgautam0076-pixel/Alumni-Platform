import React, { useEffect, useState } from "react";
import "./jobpage.css";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="job-wrapper">
      <h1 className="heading">🌟 Latest Job Opportunities</h1>

      <div className="job-grid">
        {jobs.length === 0 ? (
          <p className="no-jobs">No job listings available right now.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-header">
                <h2>{job.role}</h2>
                <span className="company-name">{job.company}</span>
              </div>

              <p className="job-description">{job.description}</p>

              <a href={job.link} target="_blank" rel="noreferrer">
                <button className="apply-btn">Apply Now 🚀</button>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
