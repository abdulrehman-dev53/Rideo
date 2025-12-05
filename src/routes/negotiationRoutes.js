const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { placeOffer } = require("../controllers/negotiationController");

router.post("/offer", auth, placeOffer);

module.exports = router;
