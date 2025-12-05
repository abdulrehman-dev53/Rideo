const express = require("express");
const router = express.Router();
const { createRide, getRides, acceptOffer } = require("../controllers/rideController");
const auth = require("../middleware/auth");

router.post("/", createRide);
router.get("/", getRides);
router.post("/accept-offer", auth, acceptOffer);

module.exports = router;
