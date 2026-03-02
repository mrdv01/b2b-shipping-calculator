const { calculateDistance } = require('../src/utils/haversine');

describe('Haversine Distance Calculation', () => {
    test('should return 0 for the same point', () => {
        const distance = calculateDistance(12.9716, 77.5946, 12.9716, 77.5946);
        expect(distance).toBe(0);
    });

    test('should calculate distance between Bangalore and Mumbai (~845 km)', () => {
        // Bangalore: 12.9716, 77.5946
        // Mumbai: 19.076, 72.8777
        const distance = calculateDistance(12.9716, 77.5946, 19.076, 72.8777);
        expect(distance).toBeGreaterThan(800);
        expect(distance).toBeLessThan(900);
    });

    test('should calculate distance between two nearby points', () => {
        // Two points ~1 km apart
        const distance = calculateDistance(12.9716, 77.5946, 12.9806, 77.5946);
        expect(distance).toBeGreaterThan(0.5);
        expect(distance).toBeLessThan(2);
    });

    test('should be symmetric (A→B = B→A)', () => {
        const d1 = calculateDistance(12.9716, 77.5946, 19.076, 72.8777);
        const d2 = calculateDistance(19.076, 72.8777, 12.9716, 77.5946);
        expect(d1).toBeCloseTo(d2, 6);
    });
});
