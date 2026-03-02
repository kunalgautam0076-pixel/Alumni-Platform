import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav
      className={`navbar 
        ${isHomePage ? (scrolled ? "scrolled" : "transparent") : "scrolled"}
      `}
    >
      <div className="nav-container">
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            ALUMNI <span>PLATFORM</span>
          </Link>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          </li>
          <li>
            <Link to="/alumni" onClick={() => setMenuOpen(false)}>Alumni</Link>
          </li>
          <li>
            <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
          </li>
          <li>
            <Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
          </li>

          {/* ================= ROLE BASED SECTION ================= */}

          {!user && (
            <>
              <li>
                <Link
                  to="/register"
                  className="register-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="login-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            </>
          )}

          {user?.role === "alumni" && (
            <li>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
          )}

          {user?.role === "admin" && (
            <li>
              <Link to="/admin" onClick={() => setMenuOpen(false)}>
                Admin Panel
              </Link>
            </li>
          )}

          {user && (
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="login-btn"
              >
                Logout
              </a>
            </li>
          )}
          
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