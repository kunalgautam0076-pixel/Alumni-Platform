require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const run = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASS;
    const name = process.env.ADMIN_NAME || 'Admin';
    if (!email || !password) return console.error('Please set ADMIN_EMAIL and ADMIN_PASS in env');

    let user = await User.findOne({ email });
    if (user) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashed, role: 'admin', approved: true });
    await user.save();
    console.log('Admin user created');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
