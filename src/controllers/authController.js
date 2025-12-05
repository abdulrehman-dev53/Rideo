const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Driver = require("../models/Driver");

exports.register = async (req, res) => {
  try {
    const { name, phone, password, vehicle } = req.body;
    const existing = await Driver.findOne({ phone });
    if (existing) return res.status(400).json({ error: "Phone already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const driver = await Driver.create({ name, phone, password: hashed, vehicle });
    res.status(201).json({ id: driver._id, name: driver.name, phone: driver.phone });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password, fcmToken } = req.body;
    const driver = await Driver.findOne({ phone });
    if (!driver) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, driver.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    if (fcmToken) {
      driver.fcmToken = fcmToken;
      await driver.save();
    }

    const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, driver: { id: driver._id, name: driver.name, phone: driver.phone } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
