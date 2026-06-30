require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// =======================
// PORT
// =======================
const PORT = Number(process.env.PORT) || 5000;

// =======================
// DATABASE
// =======================
connectDB(process.env.MONGO_URI);

// =======================
// MIDDLEWARES
// =======================
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// =======================
// ROUTES (NO DUPLICATES)
// =======================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/alumni", require("./routes/alumni"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/faculty", require("./routes/faculty"));
app.use("/api/events", require("./routes/events"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/dashboard", require("./routes/dashboard"));

app.use("/uploads", express.static("uploads"));

// =======================
// GLOBAL ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// =======================
// ROOT
// =======================
app.get("/", (req, res) => {
  res.status(200).send("🎓 Alumni Platform API is running");
});

// =======================
// START SERVER
// =======================
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// =======================
// PORT ERROR HANDLER
// =======================
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} already in use`);
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});