const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");
const rideRoutes = require("./routes/rideRoutes");
const negotiationRoutes = require("./routes/negotiationRoutes");

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/negotiations", negotiationRoutes);

app.get("/", (req, res) => res.send("InDrive backend is running..."));

module.exports = app;
