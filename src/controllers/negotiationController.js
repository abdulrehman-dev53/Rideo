const Ride = require("../models/Ride");
const Driver = require("../models/Driver");
const { sendNotification } = require("../config/firebase");

exports.placeOffer = async (req, res) => {
  try {
    const { rideId, amount, message } = req.body;
    const driverId = req.driver._id;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ error: "Ride not found" });

    ride.offers.push({ driverId, amount, message });
    ride.status = "negotiating";
    await ride.save();

    // Notify user (if using FCM for user app)
    // Here we demo notifying all drivers (topic) when a new offer appears.
    await sendNotification({
      tokens: [], // supply user token(s) here if available
      title: "New Offer",
      body: `Driver offered ${amount}`,
      data: { rideId: ride._id.toString(), amount: amount.toString() }
    });

    res.status(201).json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
