const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");

const app = express();

// ✅ Favicon handler (make sure public/favicon.ico exists)
app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));


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
  res.send("InDrive backend is running...");
});

// Export app for server.js
module.exports = app;
