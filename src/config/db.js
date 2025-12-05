const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  // no extra options in v7+
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    throw err;
  }
};

module.exports = connectDB;
