const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  amount: { type: Number, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const rideSchema = new mongoose.Schema({
  userId: String,
  pickup: { type: String, required: true },
  drop: { type: String, required: true },
  fareRequested: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "negotiating", "accepted", "in_progress", "completed", "cancelled"],
    default: "pending"
  },
  acceptedOffer: offerSchema,
  offers: [offerSchema],
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
}, { timestamps: true });

module.exports = mongoose.model("Ride", rideSchema);
