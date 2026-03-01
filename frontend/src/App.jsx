import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./components/Home";
import About from "./components/About";
import AlumniList from "./components/AlumniList";
import AlumniProfile from "./components/AlumniProfile";
import Register from "./components/Register";
import Login from "./components/Login";
import AlumniDashboard from "./components/AlumniDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import EventPage from "./components/EventPage";
import EventDetail from "./components/EventDetail";
import JobPage from "./components/JobPage";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/alumni" element={<AlumniList />} />
          <Route path="/alumni/:id" element={<AlumniProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/jobs" element={<JobPage />} />

          {/* ================= DASHBOARD ROUTES ================= */}

          {/* Alumni Dashboard (Optional Protection) */}
          <Route path="/dashboard" element={<AlumniDashboard />} />

          {/* Admin Protected Route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
      </main>
    </>
  );
}