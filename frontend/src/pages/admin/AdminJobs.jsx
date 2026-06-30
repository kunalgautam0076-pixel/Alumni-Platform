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

          <button onClick={addJob}>Add Job</button>
        </div>

        {jobs.map((job) => {
          const jobApplications = applications.filter((app) => app.jobId?._id === job._id);

          return (
            <div key={job._id} className="admin-jobs-box">
              <div className="job-main">
                <div className="job-header-row">
                  <div>
                    <h4>{job.role} - {job.company}</h4>
                    <p>{job.location}</p>
                  </div>
                  <button onClick={() => deleteJob(job._id)}>Delete</button>
                </div>

                <div className="applicant-list">
                  {jobApplications.length === 0 ? (
                    <p className="empty-applicants">No applicants yet</p>
                  ) : (
                    jobApplications.map((app) => (
                      <div className="applicant-card" key={app._id}>
                        <div>
                          <strong>{app.name}</strong>
                          <p>{app.email}</p>
                          <p>{app.phone}</p>
                        </div>
                        <div className="applicant-meta">
                          <p><strong>Cover Letter:</strong> {app.coverLetter || "—"}</p>
                          <p><strong>Resume:</strong> {app.resume ? <a href={app.resume} target="_blank" rel="noreferrer">Open Link</a> : "—"}</p>
                          <p><strong>Applied:</strong> {new Date(app.appliedAt).toLocaleString()}</p>
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
