import React, { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import AlumniList from './components/AlumniList'
import AlumniProfile from './components/AlumniProfile'
import Register from './components/Register'
import Login from './components/Login'
import AlumniDashboard from './components/AlumniDashboard'
import AdminDashboard from './components/AdminDashboard'

// ADD THESE
import EventPage from './components/EventPage'
import JobPage from './components/JobPage'

import { useAuth } from './context/AuthContext'

export default function App() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className="site-header">
        <div className="brand">ALUMNI PLATFORM</div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/alumni" onClick={() => setMenuOpen(false)}>Alumni</Link>

          {/* NEW LINKS */}
          <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>

          <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        </nav>

        {user && (
          <div className="user-info">
            <span>{user.name} <small>({user.role})</small></span>
            <button className="btn logout" onClick={logout}>Logout</button>
            {user.role === 'admin' && <Link className="btn admin" to="/admin">Admin</Link>}
            {user.role === 'alumni' && <Link className="btn dashboard" to="/dashboard">Dashboard</Link>}
          </div>
        )}
      </header>

      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/alumni" element={<AlumniList />} />
          <Route path="/alumni/:id" element={<AlumniProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<AlumniDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* NEW ROUTES */}
          <Route path="/events" element={<EventPage />} />
          <Route path="/jobs" element={<JobPage />} />
        </Routes>
      </main>
    </div>
  )
}
