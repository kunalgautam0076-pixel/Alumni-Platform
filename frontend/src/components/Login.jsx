import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css'; // import the CSS file

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', form);
      login(res.data);
      setMsg('Logged in successfully!');
      navigate('/');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={submit} className="login-form">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
            className="login-input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {msg && <p className="login-msg">{msg}</p>}
        <p className="login-footer">
          Don't have an account? <span className="signup-link">Sign Up</span>
        </p>
      </div>
    </div>
  );
}
