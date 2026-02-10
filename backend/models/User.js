const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String },
  role: { type: String, enum: ['admin', 'alumni'], default: 'alumni' },
  approved: { type: Boolean, default: false },
  bio: { type: String, default: '' },
  education: { type: String, default: '' },
  workplace: { type: String, default: '' },
  achievements: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
