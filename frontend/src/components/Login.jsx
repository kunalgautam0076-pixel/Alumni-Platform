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

  /* ================= AUTO REDIRECT IF LOGGED IN ================= */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("alumni_user"));
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "alumni") {
      navigate("/dashboard");
    }
  }, [navigate]);

  /* ================= INPUT CHANGE ================= */
  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await api.post("/api/auth/login", form);

      login(res.data);

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
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue to Alumni Platform</p>

        <form onSubmit={submit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>

          {msg && <p className="error-msg">{msg}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="bottom-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}