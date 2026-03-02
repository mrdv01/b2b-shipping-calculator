const {
    calculateShippingCharge,
    getTransportMode,
} = require('../src/services/shippingService');

describe('Transport Mode Selection', () => {
    test('should select Mini Van for distance < 100 km', () => {
        const mode = getTransportMode(50);
        expect(mode.name).toBe('Mini Van');
        expect(mode.rate).toBe(3);
    });

    test('should select Truck for distance 100-499 km', () => {
        const mode = getTransportMode(200);
        expect(mode.name).toBe('Truck');
        expect(mode.rate).toBe(2);
    });

    test('should select Aeroplane for distance >= 500 km', () => {
        const mode = getTransportMode(600);
        expect(mode.name).toBe('Aeroplane');
        expect(mode.rate).toBe(1);
    });

    test('should select Truck at exactly 100 km', () => {
        const mode = getTransportMode(100);
        expect(mode.name).toBe('Truck');
    });

    test('should select Aeroplane at exactly 500 km', () => {
        const mode = getTransportMode(500);
        expect(mode.name).toBe('Aeroplane');
    });
});

describe('Shipping Charge Calculation', () => {
    test('standard delivery: base + distance × weight × rate', () => {
        // 50 km, 10 kg, Mini Van (rate 3)
        // Expected: 10 + (50 * 10 * 3) = 10 + 1500 = 1510
        const result = calculateShippingCharge(50, 10, 'standard');
        expect(result.shippingCharge).toBe(1510);
        expect(result.transportMode).toBe('Mini Van');
        expect(result.breakdown.baseCharge).toBe(10);
        expect(result.breakdown.expressSurcharge).toBe(0);
    });

    test('express delivery: base + extra per kg + distance × weight × rate', () => {
        // 50 km, 10 kg, Mini Van (rate 3), express
        // Expected: 10 + (1.2 * 10) + (50 * 10 * 3) = 10 + 12 + 1500 = 1522
        const result = calculateShippingCharge(50, 10, 'express');
        expect(result.shippingCharge).toBe(1522);
        expect(result.transportMode).toBe('Mini Van');
        expect(result.breakdown.expressSurcharge).toBe(12);
    });

    test('Truck mode calculation', () => {
        // 200 km, 5 kg, Truck (rate 2)
        // Standard: 10 + (200 * 5 * 2) = 10 + 2000 = 2010
        const result = calculateShippingCharge(200, 5, 'standard');
        expect(result.shippingCharge).toBe(2010);
        expect(result.transportMode).toBe('Truck');
    });

    test('Aeroplane mode calculation', () => {
        // 600 km, 0.5 kg, Aeroplane (rate 1)
        // Standard: 10 + (600 * 0.5 * 1) = 10 + 300 = 310
        const result = calculateShippingCharge(600, 0.5, 'standard');
        expect(result.shippingCharge).toBe(310);
        expect(result.transportMode).toBe('Aeroplane');
    });
});
