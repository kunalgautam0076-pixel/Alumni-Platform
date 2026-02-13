import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./eventdetail.css";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});

  /* ===============================
     FETCH EVENT FROM API
  ================================= */
  useEffect(() => {
    setLoading(true);
    api.get(`/api/events/${id}`)
      .then(res => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  /* ===============================
     COUNTDOWN TIMER
  ================================= */
  useEffect(() => {
    if (!event?.date) return;

    const interval = setInterval(() => {
      const diff = new Date(event.date) - new Date();

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [event]);

  if (loading) return <div className="loading">Loading Event...</div>;
  if (!event) return <div className="error">Event Not Found</div>;

  return (
    <div className="event-detail-page">

      {/* HERO SECTION */}
      <div className="detail-hero">
        <img
          src={
            event.image ||
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
          }
          alt={event.title}
        />
        <div className="overlay"></div>

        <div className="hero-content">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <h1>{event.title}</h1>
          <p className="location">📍 {event.location || "Location TBA"}</p>

          <div className="countdown">
            <div><span>{timeLeft.days || 0}</span>Days</div>
            <div><span>{timeLeft.hours || 0}</span>Hours</div>
            <div><span>{timeLeft.minutes || 0}</span>Min</div>
            <div><span>{timeLeft.seconds || 0}</span>Sec</div>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="detail-content-section">

        <div className="detail-info">
          <h2>About This Event</h2>
          <p>{event.description}</p>
        </div>

        {/* INFO CARDS */}
        <div className="event-meta-cards">

          <div className="meta-card">
            <h4>📅 Date</h4>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>

          <div className="meta-card">
            <h4>📍 Location</h4>
            <p>{event.location || "TBA"}</p>
          </div>

          <div className="meta-card">
            <h4>🎟 Entry Type</h4>
            <p>{event.type || "Open for All Alumni"}</p>
          </div>

        </div>

        {/* CTA */}
        <div className="cta-section">
          <h3>Reserve Your Spot Today</h3>
          <button className="register-btn">Register Now</button>
        </div>

      </div>

    </div>
  );
}
