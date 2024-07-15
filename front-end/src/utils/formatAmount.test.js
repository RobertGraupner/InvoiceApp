import { formatAmount } from './formatAmount';

describe('formatAmount', () => {
	it('formats whole numbers correctly', () => {
		expect(formatAmount(1000)).toBe('1,000.00');
	});

	it('formats decimal numbers correctly', () => {
		expect(formatAmount(1000.5)).toBe('1,000.50');
	});

	it('handles zero', () => {
		expect(formatAmount(0)).toBe('0.00');
	});

	it('handles big numbers', () => {
		expect(formatAmount(1125500)).toBe('1,125,500.00');
	});
});
