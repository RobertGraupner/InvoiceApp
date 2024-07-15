import { calculateTotalPrice } from './calculateTotalPrice';

describe('calculateTotalPrice', () => {
	it('returns a number', () => {
		const result = calculateTotalPrice(2, 10);
		expect(typeof result).toBe('number');
	});

	it('handles string inputs', () => {
		const result = calculateTotalPrice('2', '10');
		expect(typeof result).toBe('number');
		expect(result).toBe(20);
	});

	it('returns 0 for invalid inputs', () => {
		expect(calculateTotalPrice('abc', 'def')).toBe(0);
	});
});
