import React, { useEffect, useState } from "react";
import "./eventpage.css";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api
      .get("/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const today = new Date();

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;

    const eventDate = new Date(event.date);
    return filter === "upcoming"
      ? eventDate >= today
      : eventDate < today;
  });

  return (
    <div className="event-page">

      {/* HERO SECTION */}
      <div className="event-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Alumni Events</h1>
          <p>
            Stay connected, inspired, and engaged through networking events,
            reunions, webinars, and career gatherings.
          </p>
        </div>
      </div>

      {/* EVENTS SECTION */}
      <div className="event-wrapper">

        <div className="event-top">
          <h2 className="section-title">Explore Events</h2>

          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "upcoming" ? "active" : ""}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={filter === "past" ? "active" : ""}
              onClick={() => setFilter("past")}
            >
              Past
            </button>
          </div>
        </div>

        <div className="event-grid">
          {filteredEvents.length === 0 ? (
            <div className="no-events">
              <h3>No Events Found</h3>
              <p>Check back later for upcoming alumni gatherings.</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div className="event-card" key={event._id}>

                <div className="event-image">
                  <img
                    src={
                      event.image ||
                      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                    }
                    alt={event.title}
                  />
                  <div className="date-badge">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="event-content">
                  <h3>{event.title}</h3>

                  <p className="event-location">
                    📍 {event.location || "Location TBA"}
                  </p>

                  <p className="event-desc">
                    {event.description}
                  </p>

                  {/* 🔥 THIS IS IMPORTANT PART */}
                  <Link 
                    to={`/events/${event._id}`} 
                    className="event-btn"
                  >
                    View Details
                  </Link>

                </div>

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
