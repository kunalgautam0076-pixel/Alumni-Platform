import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./AlumniDashboard.css";

export default function AlumniDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    education: "",
    workplace: "",
    achievements: "",
  });

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/alumni/me");
        setProfile(res.data);
        setForm({
          name: res.data.name || "",
          bio: res.data.bio || "",
          education: res.data.education || "",
          workplace: res.data.workplace || "",
          achievements: res.data.achievements || "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/api/alumni/me/update", form);
      setProfile(res.data);
      alert("Profile updated successfully ✅");
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="alumni-page">
      <div className="alumni-container">

        <div className="alumni-left">
          <div className="alumni-avatar">
            {profile?.name?.charAt(0)?.toUpperCase()}
          </div>

          <h2>{profile?.name}</h2>
          <p className="alumni-badge">Alumni Member</p>

          <div className="alumni-data">
            <strong>Education:</strong>
            <span>{profile?.education || "Not added"}</span>
          </div>

          <div className="alumni-data">
            <strong>Workplace:</strong>
            <span>{profile?.workplace || "Not added"}</span>
          </div>

          <div className="alumni-data">
            <strong>Achievements:</strong>
            <span>{profile?.achievements || "Not added"}</span>
          </div>
        </div>

        <div className="alumni-right">
          <h2>Edit Profile</h2>

          <form onSubmit={handleSave} className="alumni-form">
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} />

            <label>Workplace</label>
            <input name="workplace" value={form.workplace} onChange={handleChange} />

            <label>Education</label>
            <input name="education" value={form.education} onChange={handleChange} />

            <label>Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} />

            <label>Achievements</label>
            <textarea name="achievements" value={form.achievements} onChange={handleChange} />

            <button type="submit" className="alumni-btn">
              Save Changes
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}