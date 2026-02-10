import React, { useEffect, useState } from "react";
import "./eventpage.css"; // Make sure this file exists
import api from "../services/api";

export default function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="event-wrapper">
      <h1 className="heading">📅 Upcoming Events</h1>

      <div className="event-grid">
        {events.length === 0 ? (
          <p className="no-events">No upcoming events right now.</p>
        ) : (
          events.map((event) => (
            <div className="event-card" key={event._id}>
              <div className="event-header">
                <h2>{event.title}</h2>
                <span className="event-date">📌 {event.date}</span>
              </div>

              <p className="event-desc">{event.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
