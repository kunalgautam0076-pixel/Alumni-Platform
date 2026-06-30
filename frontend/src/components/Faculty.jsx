import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Faculty.css";

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get("/api/faculty");
        setFaculty(res.data);
      } catch (err) {
        console.error("Failed to load faculty", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  return (
    <div className="faculty-page">
      <div className="faculty-hero">
        <div className="faculty-hero-text">
          <h1>Our Faculty</h1>
          <p>
            Meet the faculty members who guide our students and shape the
            future of our alumni network.
          </p>
          <Link to="/about" className="faculty-back-btn">
            Back to About
          </Link>
        </div>
      </div>

      <section className="faculty-list-section">
        <h2>Faculty Directory</h2>

        {loading ? (
          <p className="faculty-loading">Loading faculty...</p>
        ) : faculty.length === 0 ? (
          <p className="faculty-empty">No faculty found yet.</p>
        ) : (
          <div className="faculty-grid">
            {faculty.map((item) => (
              <div key={item._id} className="faculty-card">
                <div className="faculty-avatar">
                  <img
                    src={
                      item.image ||
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                    }
                    alt={item.name}
                  />
                </div>
                <div className="faculty-card-body">
                  <h3>{item.name}</h3>
                  <p className="faculty-role">{item.title}</p>
                  <p className="faculty-department">{item.department}</p>
                  <p className="faculty-email">{item.email}</p>
                  <p className="faculty-bio">{item.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
