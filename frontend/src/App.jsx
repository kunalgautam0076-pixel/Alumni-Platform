import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

/* PUBLIC COMPONENTS */
import Home from "./components/Home";
import About from "./components/About";
import AlumniList from "./components/AlumniList";
import AlumniProfile from "./components/AlumniProfile";
import Register from "./components/Register";
import Login from "./components/Login";
import AlumniDashboard from "./components/AlumniDashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import EventPage from "./components/EventPage";
import EventDetail from "./components/EventDetail";
import JobPage from "./components/JobPage";

/* ADMIN ROUTE PROTECTION */
import AdminRoute from "./components/AdminRoute";

/* NEW ADMIN PAGES */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminRequests from "./pages/admin/AdminRequests";

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

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* ================= ALUMNI DASHBOARD ================= */}

          <Route path="/dashboard" element={<AlumniDashboard />} />

          {/* ================= ADMIN DASHBOARD ================= */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/events"
            element={
              <AdminRoute>
                <AdminEvents />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/jobs"
            element={
              <AdminRoute>
                <AdminJobs />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/requests"
            element={
              <AdminRoute>
                <AdminRequests />
              </AdminRoute>
            }
          />

        </Routes>
      </main>
    </>
  );
}