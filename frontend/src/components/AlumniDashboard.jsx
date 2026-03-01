import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./AlumniDashboard.css";

export default function AlumniDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    bio: "",
    education: "",
    workplace: "",
    achievements: "",
    profileImage: null,
  });

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const res = await api.get("/api/alumni/me");
      setProfile(res.data);

      setForm({
        name: res.data.name || "",
        bio: res.data.bio || "",
        education: res.data.education || "",
        workplace: res.data.workplace || "",
        achievements: res.data.achievements || "",
        profileImage: null,
      });

      if (res.data.profileImage) {
        setPreview(`http://localhost:5000${res.data.profileImage}`);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profileImage: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) data.append(key, form[key]);
    });

    const res = await api.put("/api/alumni/me/update", data);
    setProfile(res.data);
    alert("Profile updated successfully ✅");
  };

  if (!user) return <div className="alumni-loading">Loading...</div>;

  return (
    <div className="alumni-main">
      <div className="alumni-grid">

        {/* LEFT PROFILE CARD */}
        <div className="alumni-card">
          <div className="alumni-image-box">
            {preview ? (
              <img src={preview} alt="Profile" />
            ) : (
              <div className="alumni-avatar">
                {profile?.name?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>

          <label className="upload-btn">
            Change Photo
            <input type="file" onChange={handleImage} hidden />
          </label>

          <h2>{profile?.name}</h2>
          <p className="alumni-role">Alumni Member</p>

          <div className="alumni-info">
            <p><strong>Education:</strong> {profile?.education || "Not added"}</p>
            <p><strong>Workplace:</strong> {profile?.workplace || "Not added"}</p>
            <p><strong>Achievements:</strong> {profile?.achievements || "Not added"}</p>
          </div>
        </div>

        {/* RIGHT EDIT FORM */}
        <div className="alumni-form-card">
          <h2>Edit Profile</h2>

          <form onSubmit={handleSave}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
            <input name="workplace" value={form.workplace} onChange={handleChange} placeholder="Workplace" />
            <input name="education" value={form.education} onChange={handleChange} placeholder="Education" />
            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" />
            <textarea name="achievements" value={form.achievements} onChange={handleChange} placeholder="Achievements" />

            <button type="submit" className="alumni-save-btn">
              Save Changes
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}