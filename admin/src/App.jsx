import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('adminToken');

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const initialForm = {
  title: '',
  description: '',
  date: '',
  location: '',
  image: '',
};

const jobForm = {
  role: '',
  company: '',
  location: '',
  type: 'Full-Time',
  salary: '',
  description: '',
  skills: '',
  link: '',
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getToken()));
  const [loginForm, setLoginForm] = useState({ email: 'admin@gmail.com', password: '123456' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dashboard, setDashboard] = useState(null);
  const [requests, setRequests] = useState([]);
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [eventForm, setEventForm] = useState(initialForm);
  const [jobEntry, setJobEntry] = useState(jobForm);
  const [activeTab, setActiveTab] = useState('dashboard');

  const loadAdminData = async () => {
    try {
      const [dashRes, reqRes, eventsRes, jobsRes, appsRes, regRes] = await Promise.all([
        api.get('/dashboard'),
        api.get('/admin/requests'),
        api.get('/events'),
        api.get('/jobs'),
        api.get('/admin/applications'),
        api.get('/admin/event-registrations'),
      ]);
      setDashboard(dashRes.data);
      setRequests(reqRes.data);
      setEvents(eventsRes.data);
      setJobs(jobsRes.data);
      setApplications(appsRes.data);
      setRegistrations(regRes.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to load admin data');
    }
  };

  useEffect(() => {
    if (isLoggedIn) loadAdminData();
  }, [isLoggedIn]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post(`${API_URL}/auth/login`, loginForm);
      localStorage.setItem('adminToken', res.data.token);
      setIsLoggedIn(true);
      setMessage('Logged in successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setDashboard(null);
    setRequests([]);
    setEvents([]);
    setJobs([]);
    setApplications([]);
    setRegistrations([]);
  };

  const approveRequest = async (id) => {
    try {
      await api.post(`/admin/approve/${id}`);
      setMessage('Request approved');
      loadAdminData();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Approval failed');
    }
  };

  const rejectRequest = async (id) => {
    try {
      await api.post(`/admin/reject/${id}`);
      setMessage('Request rejected');
      loadAdminData();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Rejection failed');
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/add-event', eventForm);
      setMessage('Event published');
      setEventForm(initialForm);
      loadAdminData();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Event creation failed');
    }
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...jobEntry,
        skills: jobEntry.skills.split(',').map((s) => s.trim()).filter(Boolean),
      };
      await api.post('/admin/add-job', payload);
      setMessage('Job posted');
      setJobEntry(jobForm);
      loadAdminData();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Job creation failed');
    }
  };

  const stats = useMemo(() => [
    { label: 'Approved Alumni', value: dashboard?.alumni ?? 0, accent: 'blue' },
    { label: 'Pending Requests', value: dashboard?.pending ?? 0, accent: 'orange' },
    { label: 'Events', value: dashboard?.events ?? 0, accent: 'green' },
    { label: 'Jobs', value: dashboard?.jobs ?? 0, accent: 'purple' },
    { label: 'Applications', value: dashboard?.applications ?? 0, accent: 'pink' },
  ], [dashboard]);

  if (!isLoggedIn) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <h1>Alumni Admin</h1>
          <p>Manage approvals, events, jobs, and applications.</p>
          <form onSubmit={login}>
            <input value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="Email" />
            <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="Password" />
            <button disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
          </form>
          {message ? <div className="message">{message}</div> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>Alumni Admin</h2>
        <p>Operations Center</p>
        <nav>
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
          <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>Requests</button>
          <button className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>Events</button>
          <button className={activeTab === 'jobs' ? 'active' : ''} onClick={() => setActiveTab('jobs')}>Jobs</button>
          <button className={activeTab === 'applications' ? 'active' : ''} onClick={() => setActiveTab('applications')}>Applications</button>
        </nav>
        <button className="logout" onClick={logout}>Logout</button>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <h3>Welcome back, Admin</h3>
            <p>Everything you need to manage the alumni platform.</p>
          </div>
          {message ? <div className="message">{message}</div> : null}
        </header>

        {activeTab === 'dashboard' && (
          <section className="content-grid">
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className={`stat-card ${stat.accent}`}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
            <div className="panel">
              <h4>Recent Requests</h4>
              <ul>
                {requests.slice(0, 5).map((item) => (
                  <li key={item._id}>{item.name} · {item.email}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {activeTab === 'requests' && (
          <section className="panel">
            <h4>Pending Alumni Requests</h4>
            {requests.length === 0 ? <p>No pending requests.</p> : (
              <div className="list-card">
                {requests.map((item) => (
                  <div className="item-row" key={item._id}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.email}</p>
                    </div>
                    <div className="actions">
                      <button className="approve" onClick={() => approveRequest(item._id)}>Approve</button>
                      <button className="reject" onClick={() => rejectRequest(item._id)}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'events' && (
          <section className="content-grid">
            <div className="panel">
              <h4>Create Event</h4>
              <form onSubmit={createEvent} className="stack-form">
                <input placeholder="Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required />
                <textarea placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} />
                <input type="datetime-local" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} required />
                <input placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />
                <input placeholder="Image URL" value={eventForm.image} onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })} />
                <button type="submit">Publish Event</button>
              </form>
            </div>
            <div className="panel">
              <h4>Upcoming Events</h4>
              <div className="list-card">
                {events.map((event) => (
                  <div className="item-row" key={event._id}>
                    <div>
                      <strong>{event.title}</strong>
                      <p>{event.location || 'No location'}</p>
                    </div>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel full-span">
              <h4>Event Registrations</h4>
              <div className="list-card">
                {registrations.map((row) => (
                  <div className="item-row" key={row._id}>
                    <div>
                      <strong>{row.user?.name || 'Unknown user'}</strong>
                      <p>{row.event?.title || 'Event deleted'}</p>
                    </div>
                    <span>{new Date(row.registeredAt || row.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'jobs' && (
          <section className="content-grid">
            <div className="panel">
              <h4>Post a Job</h4>
              <form onSubmit={createJob} className="stack-form">
                <input placeholder="Role" value={jobEntry.role} onChange={(e) => setJobEntry({ ...jobEntry, role: e.target.value })} required />
                <input placeholder="Company" value={jobEntry.company} onChange={(e) => setJobEntry({ ...jobEntry, company: e.target.value })} required />
                <input placeholder="Location" value={jobEntry.location} onChange={(e) => setJobEntry({ ...jobEntry, location: e.target.value })} />
                <select value={jobEntry.type} onChange={(e) => setJobEntry({ ...jobEntry, type: e.target.value })}>
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Internship</option>
                  <option>Remote</option>
                </select>
                <input placeholder="Salary" value={jobEntry.salary} onChange={(e) => setJobEntry({ ...jobEntry, salary: e.target.value })} />
                <textarea placeholder="Description" value={jobEntry.description} onChange={(e) => setJobEntry({ ...jobEntry, description: e.target.value })} />
                <input placeholder="Skills (comma separated)" value={jobEntry.skills} onChange={(e) => setJobEntry({ ...jobEntry, skills: e.target.value })} />
                <input placeholder="External Link" value={jobEntry.link} onChange={(e) => setJobEntry({ ...jobEntry, link: e.target.value })} />
                <button type="submit">Publish Job</button>
              </form>
            </div>
            <div className="panel">
              <h4>Posted Jobs</h4>
              <div className="list-card">
                {jobs.map((job) => (
                  <div className="item-row" key={job._id}>
                    <div>
                      <strong>{job.role}</strong>
                      <p>{job.company}</p>
                    </div>
                    <span>{job.location || 'Remote'}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'applications' && (
          <section className="panel">
            <h4>Job Applications</h4>
            <div className="list-card">
              {applications.map((app) => (
                <div className="item-row" key={app._id}>
                  <div>
                    <strong>{app.name}</strong>
                    <p>{app.email} · {app.jobId?.role || 'Job'}</p>
                  </div>
                  <span>{new Date(app.appliedAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
