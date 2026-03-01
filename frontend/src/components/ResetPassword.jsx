import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/auth/reset-password/${token}`, { password });
      setMsg("Password reset successful");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Reset Password</h2>
        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}