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

import EventPage from "./components/EventPage";
import EventDetail from "./components/EventDetail";
import JobPage from "./components/JobPage";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/alumni" element={<AlumniList />} />
          <Route path="/alumni/:id" element={<AlumniProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* DASHBOARDS */}
          <Route path="/dashboard" element={<AlumniDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* EVENTS */}
          <Route path="/events" element={<EventPage />} />
          <Route path="/events/:id" element={<EventDetail />} />

          {/* JOBS */}
          <Route path="/jobs" element={<JobPage />} />
        </Routes>
      </main>
    </>
  );
}
