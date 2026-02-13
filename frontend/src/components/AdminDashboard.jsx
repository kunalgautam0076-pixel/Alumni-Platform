import React, { useEffect, useState } from "react";
import "./adminDashboard.css";
import api from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    alumni: 0,
    events: 0,
    jobs: 0,
    pending: 0,
  });

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const alumni = await api.get("/api/alumni/list");
      const events = await api.get("/api/events");
      const jobs = await api.get("/api/jobs");
      const pending = await api.get("/api/admin/requests");

      setStats({
        alumni: alumni.data.length,
        events: events.data.length,
        jobs: jobs.data.length,
        pending: pending.data.length,
      });

      setRequests(pending.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveUser = async (id) => {
    await api.post(`/api/admin/approve/${id}`);
    fetchDashboard();
  };

  const rejectUser = async (id) => {
    await api.post(`/api/admin/reject/${id}`);
    fetchDashboard();
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>Dashboard</li>
          <li>Alumni</li>
          <li>Events</li>
          <li>Jobs</li>
          <li>Requests</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="admin-main">

        <div className="admin-header">
          <h1>Dashboard Overview</h1>
        </div>

        {/* STATS CARDS */}
        <div className="stats-grid">

          <div className="stat-card">
            <h3>{stats.alumni}</h3>
            <p>Total Alumni</p>
          </div>

          <div className="stat-card">
            <h3>{stats.events}</h3>
            <p>Total Events</p>
          </div>

          <div className="stat-card">
            <h3>{stats.jobs}</h3>
            <p>Total Jobs</p>
          </div>

          <div className="stat-card highlight">
            <h3>{stats.pending}</h3>
            <p>Pending Approvals</p>
          </div>

        </div>

        {/* PENDING REQUESTS */}
        <div className="request-section">
          <h2>Pending Alumni Requests</h2>

          {requests.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            requests.map((user) => (
              <div key={user._id} className="request-card">
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
                <div className="actions">
                  <button
                    className="approve"
                    onClick={() => approveUser(user._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() => rejectUser(user._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
