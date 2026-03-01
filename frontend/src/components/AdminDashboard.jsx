import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./adminDashboard.css";

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
    <div className="admin-wrapper">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin Panel</h2>

        <ul className="admin-menu">
          <li className="active">Dashboard</li>
          <li>Alumni</li>
          <li>Events</li>
          <li>Jobs</li>
          <li>Requests</li>
        </ul>
      </aside>

      {/* MAIN */}
      <div className="admin-content">

        <h1 className="admin-title">Dashboard Overview</h1>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-card">
            <h3>{stats.alumni}</h3>
            <p>Total Alumni</p>
          </div>

          <div className="admin-card">
            <h3>{stats.events}</h3>
            <p>Total Events</p>
          </div>

          <div className="admin-card">
            <h3>{stats.jobs}</h3>
            <p>Total Jobs</p>
          </div>

          <div className="admin-card highlight">
            <h3>{stats.pending}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>

        {/* Requests */}
        <div className="admin-requests">
          <h2>Pending Alumni Requests</h2>

          {requests.length === 0 ? (
            <p className="no-data">No pending requests</p>
          ) : (
            requests.map((user) => (
              <div key={user._id} className="request-box">
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>

                <div className="btn-group">
                  <button
                    className="approve-btn"
                    onClick={() => approveUser(user._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="reject-btn"
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
