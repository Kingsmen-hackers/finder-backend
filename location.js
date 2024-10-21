require("dotenv").config();
const threshold = process.env.THRESHOLD || 500; // Set your threshold in meters
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of the Earth in meters
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

function isWithinThreshold(
  buyerLat,
  buyerLon,
  vendorLat,
  vendorLon,
  threshold
) {
  return true;
  const distance = calculateDistance(buyerLat, buyerLon, vendorLat, vendorLon);
  return distance <= threshold;
}

module.exports = {
  calculateDistance,
  threshold,
  isWithinThreshold,
};
