require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// =======================
// ENV SAFE PORT
// =======================
const PORT = Number(process.env.PORT) || 5000;

// =======================
// DB CONNECT (SAFE)
// =======================
connectDB(process.env.MONGO_URI);

// =======================
// MIDDLEWARES
// =======================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// =======================
// ROUTES
// =======================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/alumni", require("./routes/alumni"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/events", require("./routes/events"));
app.use("/api/jobs", require("./routes/jobs"));

// =======================
// ROOT
// =======================
app.get("/", (req, res) => {
  res.status(200).send("🎓 Alumni Platform API is running");
});

// =======================
// SERVER START (SAFE)
// =======================
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// =======================
// HANDLE PORT ERROR (VERY IMPORTANT)
// =======================
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} already in use`);
    console.error("👉 Close other backend or change PORT in .env");
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});
