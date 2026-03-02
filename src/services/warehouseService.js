const { calculateDistance } = require('../utils/haversine');

/**
 * Finds the nearest warehouse to a given location.
 *
 * @param {number} lat - Latitude of the origin (seller location)
 * @param {number} lng - Longitude of the origin (seller location)
 * @param {Array} warehouses - Array of warehouse records
 * @returns {Object} { warehouse, distance } - Nearest warehouse and distance in km
 */
function findNearestWarehouse(lat, lng, warehouses) {
    let nearest = null;
    let minDistance = Infinity;

    for (const warehouse of warehouses) {
        const distance = calculateDistance(lat, lng, warehouse.latitude, warehouse.longitude);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = warehouse;
        }
    }

    return { warehouse: nearest, distance: minDistance };
}

module.exports = { findNearestWarehouse };
