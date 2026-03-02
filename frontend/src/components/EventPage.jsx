import React, { useEffect, useState } from "react";
import "./Eventpage.css";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ===============================
     THEME HANDLER
  =============================== */
  useEffect(() => {
    document.body.classList.remove("dark", "vision");
    if (theme === "dark") document.body.classList.add("dark");
    if (theme === "vision") document.body.classList.add("vision");
  }, [theme]);

  /* ===============================
     FETCH EVENTS
  =============================== */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/events");

        console.log("EVENT DATA:", res.data);

        setEvents(res.data || []);
        setError("");
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /* ===============================
     FILTER LOGIC (Timezone Safe)
  =============================== */
  const filteredEvents = events.filter((event) => {
  if (!event.date) return false;

  const eventDate = new Date(event.date);
  const today = new Date();

  // Remove time part (VERY IMPORTANT)
  const eventOnlyDate = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate()
  );

  const todayOnlyDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  if (filter === "all") return true;

  if (filter === "upcoming") {
    return eventOnlyDate >= todayOnlyDate;
  }

  if (filter === "past") {
    return eventOnlyDate < todayOnlyDate;
  }

  return true;
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

        {/* EVENT GRID */}
        <div className="event-grid">
          {loading ? (
            <div className="no-events">
              <h3>Loading events...</h3>
            </div>
          ) : error ? (
            <div className="no-events">
              <h3>{error}</h3>
            </div>
          ) : filteredEvents.length === 0 ? (
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
                      event.image
                        ? `http://localhost:5000/uploads/${event.image}`
                        : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                    }
                    alt={event.title}
                    onError={(e) =>
                      (e.target.src =
                        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30")
                    }
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
                    {event.description
                      ? event.description.slice(0, 120) + "..."
                      : "No description available."}
                  </p>

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