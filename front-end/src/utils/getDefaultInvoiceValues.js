export function getDefaultInvoiceValues(mode, initialData) {
	if (mode === 'edit') {
		return {
			invoice_number: initialData.invoice_number,
			invoiceDate: new Date(initialData.created_at),
			paymentTerms: initialData.payment_terms,
			projectDescription: initialData.description,
			clientName: initialData.client_name,
			clientEmail: initialData.client_email,
			status: initialData.status,
			streetAddress: initialData.sender_address?.street,
			city: initialData.sender_address?.city,
			postCode: initialData.sender_address?.postCode,
			country: initialData.sender_address?.country,
			clientStreetAddress: initialData.client_address?.street,
			clientCity: initialData.client_address?.city,
			clientPostCode: initialData.client_address?.postCode,
			clientCountry: initialData.client_address?.country,
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
