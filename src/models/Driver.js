const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  vehicle: {
    make: String,
    model: String,
    plate: String,
  },
  fcmToken: String,
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);
