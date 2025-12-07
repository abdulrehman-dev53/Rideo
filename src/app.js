const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const fs = require("fs");

const app = express();

// ✅ Log favicon requests for debugging
const faviconPath = path.join(__dirname, "..", "public", "favicon.ico");
app.use("/favicon.ico", (req, res, next) => {
  console.log("🔍 Favicon requested:", req.originalUrl);

  if (!fs.existsSync(faviconPath)) {
    console.error("❌ Favicon file not found at:", faviconPath);
  } else {
    console.log("✅ Favicon file exists at:", faviconPath);
  }

  next();
});

// ✅ Favicon handler (make sure public/favicon.ico exists)
app.use(favicon(faviconPath));

// ✅ Serve static files
app.use(express.static(path.join(__dirname, "..", "public")));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const rideRoutes = require("./routes/rideRoutes");
const negotiationRoutes = require("./routes/negotiationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/negotiations", negotiationRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is live on Vercel");
});

// ✅ Healthcheck route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Global error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
