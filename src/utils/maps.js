const axios = require("axios");

const BASE = "https://maps.googleapis.com/maps/api";

const getRouteInfo = async (origin, destination) => {
  const key = process.env.GOOGLE_MAPS_API_KEY;

  // Directions API: path + legs
  const directionsUrl = `${BASE}/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${key}`;
  const { data: dir } = await axios.get(directionsUrl);
  const route = dir.routes?.[0];
  const leg = route?.legs?.[0];

  // Distance Matrix (optional for precise distance/time)
  const dmUrl = `${BASE}/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${key}`;
  const { data: dm } = await axios.get(dmUrl);
  const element = dm.rows?.[0]?.elements?.[0];

  return {
    polyline: route?.overview_polyline?.points || null,
    distanceText: leg?.distance?.text || element?.distance?.text || null,
    durationText: leg?.duration?.text || element?.duration?.text || null,
    distanceValue: leg?.distance?.value || element?.distance?.value || null,
    durationValue: leg?.duration?.value || element?.duration?.value || null,
    startAddress: leg?.start_address || null,
    endAddress: leg?.end_address || null,
  };
};

module.exports = { getRouteInfo };
