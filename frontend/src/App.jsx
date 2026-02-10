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
import Navbar from './components/Navbar'

// ADD THESE
import EventPage from './components/EventPage'
import JobPage from './components/JobPage'

import { useAuth } from './context/AuthContext'

export default function App() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <main >
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
