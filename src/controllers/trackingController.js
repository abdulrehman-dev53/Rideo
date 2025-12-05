const { getRouteInfo } = require("../utils/maps");

exports.getRoute = async (req, res) => {
  try {
    const { origin, destination } = req.query;
    if (!origin || !destination) return res.status(400).json({ error: "origin and destination are required" });

    const info = await getRouteInfo(origin, destination); // e.g., "31.418,73.079" to "31.45,73.12"
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
