require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" }
});

// ✅ Initialize sockets
const trackingSocket = require("./utils/tracking.socket.js");
trackingSocket(io);

// ✅ Log critical env variables for Vercel debugging
console.log("🔍 Vercel ENV Check:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("FIREBASE_PRIVATE_KEY exists:", !!process.env.FIREBASE_PRIVATE_KEY);
console.log("GOOGLE_MAPS_API_KEY exists:", !!process.env.GOOGLE_MAPS_API_KEY);

// ✅ Count all environment variables
console.log("✅ ENV count:", Object.keys(process.env).length);

const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB and start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });

// ✅ Root route with error handling
app.get("/", (req, res) => {
  try {
    res.send("✅ Backend is live on Vercel");
  } catch (err) {
    console.error("❌ Error in root route:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { io };
