const Ride = require("../models/Ride");
const { sendNotification } = require("../config/firebase");

exports.createRide = async (req, res) => {
  try {
    const { userId, pickup, drop, fareRequested } = req.body;
    const ride = await Ride.create({ userId, pickup, drop, fareRequested, status: "negotiating" });
    res.status(201).json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find().sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.acceptOffer = async (req, res) => {
  try {
    const { rideId, offerIndex } = req.body;
    const ride = await Ride.findById(rideId);
    if (!ride || !ride.offers[offerIndex]) return res.status(404).json({ error: "Offer not found" });

    ride.acceptedOffer = ride.offers[offerIndex];
    ride.driverId = ride.acceptedOffer.driverId;
    ride.status = "accepted";
    await ride.save();

    // Notify driver (if you store tokens per driver)
    // You could look up driver fcmToken by ride.driverId and send a notification here.

    res.json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
