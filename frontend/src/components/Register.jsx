import React, { useState } from "react";
import api from "../services/api";
import "./register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    education: "",
    workplace: "",
    achievements: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await api.post("/api/auth/register", form);
      setMsg(res.data.message);
      setForm({
        name: "",
        email: "",
        password: "",
        bio: "",
        education: "",
        workplace: "",
        achievements: "",
      });
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Alumni Registration</h2>
        <p className="subtitle">
          Join the SB Jain Alumni Network and reconnect with excellence.
        </p>

        <form onSubmit={submit}>

          <div className="form-grid">

            <div className="input-group">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                required
              />
              <label>Full Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
              />
              <label>Email Address</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                required
              />
              <label>Password</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="workplace"
                value={form.workplace}
                onChange={onChange}
              />
              <label>Workplace</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="education"
                value={form.education}
                onChange={onChange}
              />
              <label>Education</label>
            </div>

          </div>

          <div className="input-group full">
            <textarea
              name="bio"
              value={form.bio}
              onChange={onChange}
              rows="3"
            />
            <label>Short Bio</label>
          </div>

          <div className="input-group full">
            <textarea
              name="achievements"
              value={form.achievements}
              onChange={onChange}
              rows="3"
            />
            <label>Achievements</label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </button>

        </form>

        {msg && <div className="message">{msg}</div>}
      </div>
    </div>
  );
}
