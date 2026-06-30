import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "./AdminSidebar";
import "./AdminJobs.css";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [newJob, setNewJob] = useState({
    role: "",
    company: "",
    location: "",
    type: "",
    salary: "",
  });

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    const res = await api.get("/api/jobs");
    setJobs(res.data);
  };

  const fetchApplications = async () => {
    try {
      const res = await api.get("/api/admin/applications");
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const addJob = async () => {
    await api.post("/api/jobs", newJob);
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await api.delete(`/api/jobs/${id}`);
    fetchJobs();
  };

  return (
    <div className="admin-jobs-wrapper">
      <AdminSidebar />

      <div className="admin-jobs-content">
        <h1 className="admin-jobs-title">Manage Jobs</h1>

        <div className="admin-jobs-form">
          <input name="role" placeholder="Role" onChange={handleChange} />
          <input name="company" placeholder="Company" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />

          <select name="type" onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>

          <input name="salary" placeholder="Salary" onChange={handleChange} />

          <button className="admin-jobs-add-button" onClick={addJob}>Add Job</button>
        </div>

        {jobs.map((job) => {
          const jobApplications = applications.filter((app) => app.jobId?._id === job._id);

          return (
            <div key={job._id} className="admin-jobs-box">
              <div className="job-main">
                <div className="job-header-row">
                  <div>
                    <h4>{job.role}</h4>
                    <p className="job-company">{job.company} · {job.location || 'Remote'}</p>
                  </div>
                  <button className="admin-jobs-delete-button" onClick={() => deleteJob(job._id)}>Delete</button>
                </div>

                <div className="applicant-list">
                  {jobApplications.length === 0 ? (
                    <p className="empty-applicants">No applicants have applied to this job yet.</p>
                  ) : (
                    jobApplications.map((app) => (
                      <div className="applicant-card" key={app._id}>
                        <div className="applicant-details">
                          <strong>{app.name}</strong>
                          <p>{app.email}</p>
                          <p>{app.phone || 'No phone provided'}</p>
                        </div>
                        <div className="applicant-meta">
                          <p><span>Cover Letter:</span> {app.coverLetter || "N/A"}</p>
                          <p><span>Resume:</span> {app.resume ? <a className="admin-jobs-applicant-link" href={app.resume} target="_blank" rel="noreferrer">Open Link</a> : "N/A"}</p>
                          <p><span>Applied:</span> {new Date(app.appliedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
