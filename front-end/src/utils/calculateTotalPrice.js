export const calculateTotalPrice = (quantity, price) => {
	const quantityValue = parseFloat(quantity) || 0;
	const priceValue = parseFloat(price) || 0;
	return quantityValue * priceValue;
};
