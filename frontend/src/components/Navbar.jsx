import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar 
        ${isHomePage ? (scrolled ? "scrolled" : "transparent") : "scrolled"}
      `}
    >
      <div className="nav-container">
        <div className="logo">
          ALUMNI <span>PLATFORM</span>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/alumni">Alumni</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/jobs">Jobs</a></li>
          <li><a href="/register" className="register-btn">Register</a></li>
          <li><a href="/login" className="login-btn">Login</a></li>
        </ul>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
