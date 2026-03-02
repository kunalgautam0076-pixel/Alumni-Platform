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

  /* ========================= FETCH DATA ========================= */

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

  /* ========================= REQUEST ACTIONS ========================= */

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

  /* ========================= EVENT CRUD ========================= */

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

  /* ========================= JOB CRUD ========================= */

  const handleJobChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const addJob = async () => {
    await api.post("/api/jobs", newJob);
    setNewJob({ role: "", company: "", location: "", type: "", salary: "" });
    fetchJobs();
    fetchDashboard();
  };

  const deleteJob = async (id) => {
    await api.delete(`/api/jobs/${id}`);
    fetchJobs();
    fetchDashboard();
  };

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin Panel</h2>

        <ul className="admin-menu">
          <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveTab("events")}>Manage Events</li>
          <li onClick={() => setActiveTab("jobs")}>Manage Jobs</li>
          <li onClick={() => setActiveTab("requests")}>Requests</li>
        </ul>
      </aside>

      <div className="admin-content">

        {/* ================= DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <>
            <h1>Dashboard Overview</h1>
            <div className="admin-stats">
              <div className="admin-card"><h3>{stats.alumni}</h3><p>Total Alumni</p></div>
              <div className="admin-card"><h3>{stats.events}</h3><p>Total Events</p></div>
              <div className="admin-card"><h3>{stats.jobs}</h3><p>Total Jobs</p></div>
              <div className="admin-card highlight"><h3>{stats.pending}</h3><p>Pending Approvals</p></div>
            </div>
          </>
        )}

        {/* ================= EVENTS ================= */}
        {activeTab === "events" && (
          <>
            <h2>Add Event</h2>
            <input name="title" placeholder="Title" value={newEvent.title} onChange={handleEventChange} />
            <input name="description" placeholder="Description" value={newEvent.description} onChange={handleEventChange} />
            <input type="date" name="date" value={newEvent.date} onChange={handleEventChange} />
            <input name="location" placeholder="Location" value={newEvent.location} onChange={handleEventChange} />
            <button onClick={addEvent}>Add Event</button>

            <h2>All Events</h2>
            {events.map((event) => (
              <div key={event._id} className="request-box">
                <div>
                  <h4>{event.title}</h4>
                  <p>{new Date(event.date).toDateString()}</p>
                </div>
                <button className="reject-btn" onClick={() => deleteEvent(event._id)}>Delete</button>
              </div>
            ))}
          </>
        )}

        {/* ================= JOBS ================= */}
        {activeTab === "jobs" && (
          <>
            <h2>Add Job</h2>
            <input name="role" placeholder="Role" value={newJob.role} onChange={handleJobChange} />
            <input name="company" placeholder="Company" value={newJob.company} onChange={handleJobChange} />
            <input name="location" placeholder="Location" value={newJob.location} onChange={handleJobChange} />
            <input name="type" placeholder="Type (Full-Time/Internship)" value={newJob.type} onChange={handleJobChange} />
            <input name="salary" placeholder="Salary" value={newJob.salary} onChange={handleJobChange} />
            <button onClick={addJob}>Add Job</button>

            <h2>All Jobs</h2>
            {jobs.map((job) => (
              <div key={job._id} className="request-box">
                <div>
                  <h4>{job.role} - {job.company}</h4>
                  <p>{job.location}</p>
                </div>
                <button className="reject-btn" onClick={() => deleteJob(job._id)}>Delete</button>
              </div>
            ))}
          </>
        )}

        {/* ================= REQUESTS ================= */}
        {activeTab === "requests" && (
          <>
            <h2>Pending Requests</h2>
            {requests.length === 0 ? (
              <p>No pending requests</p>
            ) : (
              requests.map((user) => (
                <div key={user._id} className="request-box">
                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <button className="approve-btn" onClick={() => approveUser(user._id)}>Approve</button>
                    <button className="reject-btn" onClick={() => rejectUser(user._id)}>Reject</button>
                  </div>
                </div>
              ))
            )}
          </>
        )}

      </div>
    </div>
  );
}