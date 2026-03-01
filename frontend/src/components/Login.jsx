import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("alumni_user"));
    if (user?.role === "admin") navigate("/admin");
    else if (user?.role === "alumni") navigate("/dashboard");
  }, [navigate]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
const submit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMsg("");

  try {
    const res = await api.post("/api/auth/login", form);

    console.log("SERVER RESPONSE:", res.data); // 🔥 debug

    login(res.data); // VERY IMPORTANT

    if (res.data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    setMsg(err.response?.data?.message || "Invalid credentials");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login1-wrapper">
      <div className="login1-card">
        <h2 className="login1-title">Login</h2>

        <form onSubmit={submit} className="login1-form">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={onChange}
            required
            className="login1-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
            className="login1-input"
          />

          {msg && <p className="login1-error">{msg}</p>}

          <button type="submit" disabled={loading} className="login1-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login1-links">
          <span onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </span>
          <span onClick={() => navigate("/register")}>
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
}