import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Eventdetail.css";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [countdownData, setCountdownData] = useState({});

  useEffect(() => {
    setLoadingState(true);
    api.get(`/api/events/${id}`)
      .then(res => {
        setEventData(res.data);
        setLoadingState(false);
      })
      .catch(() => setLoadingState(false));
  }, [id]);

  useEffect(() => {
    if (!eventData?.date) return;

    const timer = setInterval(() => {
      const diff = new Date(eventData.date) - new Date();

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setCountdownData({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventData]);

  if (loadingState) return <div className="danger-loader">Loading Event...</div>;
  if (!eventData) return <div className="danger-error">Event Not Found</div>;

  return (
    <div className="danger-event-wrapper">

      <div className="danger-hero-section">
        <img
          src={
            eventData.image ||
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
          }
          alt={eventData.title}
          className="danger-hero-image"
        />
        <div className="danger-overlay"></div>

        <div className="danger-hero-content">
          <button className="danger-back-btn" onClick={() => navigate(-1)}>
            ← Go Back
          </button>

          <h1 className="danger-title">{eventData.title}</h1>
          <p className="danger-location">
            📍 {eventData.location || "Location TBA"}
          </p>

          <div className="danger-countdown-box">
            <div><span>{countdownData.days || 0}</span>Days</div>
            <div><span>{countdownData.hours || 0}</span>Hours</div>
            <div><span>{countdownData.minutes || 0}</span>Min</div>
            <div><span>{countdownData.seconds || 0}</span>Sec</div>
          </div>
        </div>
      </div>

      <div className="danger-content-area">

        <div className="danger-description">
          <h2>About This Event</h2>
          <p>{eventData.description}</p>
        </div>

        <div className="danger-meta-grid">

          <div className="danger-meta-card">
            <h4>📅 Date</h4>
            <p>{new Date(eventData.date).toLocaleDateString()}</p>
          </div>

          <div className="danger-meta-card">
            <h4>📍 Location</h4>
            <p>{eventData.location || "TBA"}</p>
          </div>

          <div className="danger-meta-card">
            <h4>🎟 Entry</h4>
            <p>Open for Alumni</p>
          </div>

        </div>

        <div className="danger-cta">
          <h3>Reserve Your Spot Today</h3>
          <button className="danger-register-btn">Register Now 🚀</button>
        </div>

      </div>
    </div>
  );
}