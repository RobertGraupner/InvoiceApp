import { formatDate } from './formatDate';

describe('formatDate', () => {
	it('formats date correctly', () => {
		expect(formatDate('2021-08-21')).toBe('21 Aug 2021');
	});

	it('handles different month', () => {
		expect(formatDate('2021-12-01')).toBe('01 Dec 2021');
	});
});
