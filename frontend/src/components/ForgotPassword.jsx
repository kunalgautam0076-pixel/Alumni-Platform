import React, { useState } from "react";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/forgot-password", { email });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Forgot Password</h2>
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}