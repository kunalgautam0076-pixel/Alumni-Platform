import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [stats, setStats] = useState({
    alumni: 0,
    events: 0,
    jobs: 0,
    pending: 0,
  });

  const [requests, setRequests] = useState([]);
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const [newJob, setNewJob] = useState({
    role: "",
    company: "",
    location: "",
    type: "",
    salary: "",
  });

  useEffect(() => {
    fetchDashboard();
    fetchRequests();
    fetchEvents();
    fetchJobs();
  }, []);

  const fetchDashboard = async () => {
    const res = await api.get("/api/dashboard");
    setStats(res.data);
  };

  const fetchRequests = async () => {
    const res = await api.get("/api/admin/requests");
    setRequests(res.data);
  };

  const fetchEvents = async () => {
    const res = await api.get("/api/events");
    setEvents(res.data);
  };

  const fetchJobs = async () => {
    const res = await api.get("/api/jobs");
    setJobs(res.data);
  };

  const approveUser = async (id) => {
    await api.post(`/api/admin/approve/${id}`);
    fetchRequests();
    fetchDashboard();
  };

  const rejectUser = async (id) => {
    await api.post(`/api/admin/reject/${id}`);
    fetchRequests();
    fetchDashboard();
  };

  const handleEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const addEvent = async () => {
    await api.post("/api/events", newEvent);
    setNewEvent({ title: "", description: "", date: "", location: "" });
    fetchEvents();
    fetchDashboard();
  };

  const deleteEvent = async (id) => {
    await api.delete(`/api/events/${id}`);
    fetchEvents();
    fetchDashboard();
  };

  const handleJobChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

const addJob = async () => {
  try {
    await api.post("/api/jobs", newJob);
    setNewJob({ role: "", company: "", location: "", type: "", salary: "" });
    fetchJobs();
    fetchDashboard();
  } catch (err) {
    console.log("Backend error:", err.response?.data);
    alert(err.response?.data?.message || "Failed to create job");
  }
};

  const deleteJob = async (id) => {
    await api.delete(`/api/jobs/${id}`);
    fetchJobs();
    fetchDashboard();
  };

  return (
    <div className="admin3-wrapper">
      <aside className="admin3-sidebar">
        <h2 className="admin3-logo">⚡ CONTROL</h2>
        <ul className="admin3-menu">
          <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveTab("events")}>Events</li>
          <li onClick={() => setActiveTab("jobs")}>Jobs</li>
          <li onClick={() => setActiveTab("requests")}>Requests</li>
        </ul>
      </aside>

      <div className="admin3-content">

        {activeTab === "dashboard" && (
          <>
            <h1 className="admin3-title">System Overview</h1>
            <div className="admin3-stats">
              <div className="admin3-card"><h3>{stats.alumni}</h3><p>Alumni</p></div>
              <div className="admin3-card"><h3>{stats.events}</h3><p>Events</p></div>
              <div className="admin3-card"><h3>{stats.jobs}</h3><p>Jobs</p></div>
              <div className="admin3-card admin3-highlight"><h3>{stats.pending}</h3><p>Pending</p></div>
            </div>
          </>
        )}

        {activeTab === "events" && (
          <>
            <h2 className="admin3-title">Manage Events</h2>
            <div className="admin3-form">
              <input name="title" placeholder="Title" value={newEvent.title} onChange={handleEventChange}/>
              <input name="description" placeholder="Description" value={newEvent.description} onChange={handleEventChange}/>
              <input type="date" name="date" value={newEvent.date} onChange={handleEventChange}/>
              <input name="location" placeholder="Location" value={newEvent.location} onChange={handleEventChange}/>
              <button onClick={addEvent}>Add Event</button>
            </div>

            {events.map((event) => (
              <div key={event._id} className="admin3-request-box">
                <div>
                  <h4>{event.title}</h4>
                  <p>{new Date(event.date).toDateString()}</p>
                </div>
                <button className="admin3-reject-btn" onClick={() => deleteEvent(event._id)}>Delete</button>
              </div>
            ))}
          </>
        )}

        {activeTab === "jobs" && (
          <>
            <h2 className="admin3-title">Manage Jobs</h2>
            <div className="admin3-form">
              <input name="role" placeholder="Role" value={newJob.role} onChange={handleJobChange}/>
              <input name="company" placeholder="Company" value={newJob.company} onChange={handleJobChange}/>
              <input name="location" placeholder="Location" value={newJob.location} onChange={handleJobChange}/>
              <select name="type" value={newJob.type} onChange={handleJobChange}>
  <option value="">Select Type</option>
  <option value="Full-Time">Full-Time</option>
  <option value="Part-Time">Part-Time</option>
  <option value="Internship">Internship</option>
  <option value="Remote">Remote</option>
</select>
              <input name="salary" placeholder="Salary" value={newJob.salary} onChange={handleJobChange}/>
              <button onClick={addJob}>Add Job</button>
            </div>

            {jobs.map((job) => (
              <div key={job._id} className="admin3-request-box">
                <div>
                  <h4>{job.role} - {job.company}</h4>
                  <p>{job.location}</p>
                </div>
                <button className="admin3-reject-btn" onClick={() => deleteJob(job._id)}>Delete</button>
              </div>
            ))}
          </>
        )}

        {activeTab === "requests" && (
          <>
            <h2 className="admin3-title">Pending Requests</h2>
            {requests.map((user) => (
              <div key={user._id} className="admin3-request-box">
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <button className="admin3-approve-btn" onClick={() => approveUser(user._id)}>Approve</button>
                  <button className="admin3-reject-btn" onClick={() => rejectUser(user._id)}>Reject</button>
                </div>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
}