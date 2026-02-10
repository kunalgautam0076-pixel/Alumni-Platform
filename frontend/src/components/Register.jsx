import React, { useState } from 'react';
import api from '../services/api';
import './register.css';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    education: '',
    workplace: '',
    achievements: '',
  });
  const [msg, setMsg] = useState('');

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/register', form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Alumni Registration</h2>
        <p className="subtitle">Join our alumni network and stay connected.</p>
        <form onSubmit={submit}>
          <div className="input-group">
            <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
          </div>
          <div className="input-group">
            <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
          </div>
          <div className="input-group">
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
          </div>
          <div className="input-group">
            <input name="workplace" placeholder="Workplace" value={form.workplace} onChange={onChange} />
          </div>
          <div className="input-group">
            <input name="education" placeholder="Education" value={form.education} onChange={onChange} />
          </div>
          <div className="input-group">
            <textarea name="bio" placeholder="Bio" value={form.bio} onChange={onChange}></textarea>
          </div>
          <div className="input-group">
            <textarea name="achievements" placeholder="Achievements" value={form.achievements} onChange={onChange}></textarea>
          </div>
          <button type="submit">Submit Registration</button>
        </form>
        {msg && <p className="message">{msg}</p>}
      </div>
    </div>
  );
}
