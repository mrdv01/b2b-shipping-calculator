/**
 * Shipping charge calculation service.
 * Implements transport mode selection (Strategy pattern) and pricing.
 */

// Transport mode configurations — ordered by priority (highest distance threshold first)
const TRANSPORT_MODES = [
    { name: 'Aeroplane', minDistance: 500, rate: 1 },
    { name: 'Truck', minDistance: 100, rate: 2 },
    { name: 'Mini Van', minDistance: 0, rate: 3 },
];

const BASE_CHARGE = 10; // Rs 10 base charge
const EXPRESS_EXTRA_PER_KG = 1.2; // Rs 1.2 per kg extra for express

/**
 * Determines the transport mode based on distance.
 *
 * @param {number} distanceKm - Distance in kilometers
 * @returns {Object} { name, rate } - Selected transport mode
 */
function getTransportMode(distanceKm) {
    for (const mode of TRANSPORT_MODES) {
        if (distanceKm >= mode.minDistance) {
            return { name: mode.name, rate: mode.rate };
        }
    }
    // Fallback (should not reach here)
    return TRANSPORT_MODES[TRANSPORT_MODES.length - 1];
}

/**
 * Calculates the total shipping charge.
 *
 * Standard: Rs 10 (base) + distance × weight × rate
 * Express:  Rs 10 (base) + Rs 1.2/kg (extra) + distance × weight × rate
 *
 * @param {number} distanceKm - Distance in kilometers
 * @param {number} weightKg - Product weight in kilograms
 * @param {string} deliverySpeed - "standard" or "express"
 * @returns {Object} { shippingCharge, transportMode, breakdown }
 */
function calculateShippingCharge(distanceKm, weightKg, deliverySpeed) {
    const transport = getTransportMode(distanceKm);

    // Core shipping cost: distance × weight × rate
    const distanceCharge = distanceKm * weightKg * transport.rate;

    // Express surcharge
    const expressSurcharge =
        deliverySpeed === 'express' ? EXPRESS_EXTRA_PER_KG * weightKg : 0;

    // Total
    const totalCharge = BASE_CHARGE + expressSurcharge + distanceCharge;

    return {
        shippingCharge: parseFloat(totalCharge.toFixed(2)),
        transportMode: transport.name,
        breakdown: {
            baseCharge: BASE_CHARGE,
            expressSurcharge: parseFloat(expressSurcharge.toFixed(2)),
            distanceCharge: parseFloat(distanceCharge.toFixed(2)),
            distanceKm: parseFloat(distanceKm.toFixed(2)),
            weightKg,
            ratePerKmPerKg: transport.rate,
        },
    };
}

module.exports = { calculateShippingCharge, getTransportMode };
