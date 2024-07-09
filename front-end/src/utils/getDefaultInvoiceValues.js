export function getDefaultInvoiceValues(mode, initialData) {
	if (mode === 'edit') {
		return {
			id: initialData.id,
			invoiceDate: new Date(initialData.createdAt),
			paymentTerms: initialData.paymentTerms,
			projectDescription: initialData.description,
			clientName: initialData.clientName,
			clientEmail: initialData.clientEmail,
			status: initialData.status,
			streetAddress: initialData.senderAddress?.street,
			city: initialData.senderAddress?.city,
			postCode: initialData.senderAddress?.postCode,
			country: initialData.senderAddress?.country,
			clientStreetAddress: initialData.clientAddress?.street,
			clientCity: initialData.clientAddress?.city,
			clientPostCode: initialData.clientAddress?.postCode,
			clientCountry: initialData.clientAddress?.country,
			items: initialData.items?.map((item) => ({
				name: item.name,
				quantity: item.quantity.toString(),
				price: item.price.toString(),
			})) || [{ name: '', quantity: '', price: '' }],
		};
	}
	return {
		items: [{ name: '', quantity: '', price: '' }],
	};
}
