const jwt = require("jsonwebtoken");
const Driver = require("../models/Driver");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Missing token" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const driver = await Driver.findById(payload.id).select("-password");
    if (!driver) return res.status(401).json({ error: "Invalid token" });

    req.driver = driver;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
