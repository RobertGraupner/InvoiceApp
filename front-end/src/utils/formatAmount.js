export const formatAmount = (amount) => {
	return new Intl.NumberFormat('en-GB', {
		style: 'decimal',
		minimumFractionDigits: 2,
	}).format(amount);
};
