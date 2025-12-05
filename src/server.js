require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" }
});

// Initialize sockets
const trackingSocket = require("./utils/tracking.socket.js");
trackingSocket(io);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });

module.exports = { io };

