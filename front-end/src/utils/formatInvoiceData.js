import { v4 as uuidv4 } from 'uuid';

export function formatInvoiceData(values, mode) {
	const paymentTermsMap = {
		'Net 1 Day': 1,
		'Net 7 Days': 7,
		'Net 14 Days': 14,
		'Net 30 Days': 30,
	};

	return {
		...(mode === 'edit'
			? { id: values.id }
			: { id: uuidv4().slice(0, 6).toUpperCase() }),
		createdAt: values.invoiceDate.toISOString().split('T')[0],
		paymentDue: calculatePaymentDue(
			values.invoiceDate,
			paymentTermsMap[values.paymentTerms]
		),
		description: values.projectDescription,
		paymentTerms: paymentTermsMap[values.paymentTerms],
		clientName: values.clientName,
		clientEmail: values.clientEmail,
		status: mode === 'edit' ? values.status : 'Pending',
		senderAddress: {
			street: values.streetAddress,
			city: values.city,
			postCode: values.postCode,
			country: values.country,
		},
		clientAddress: {
			street: values.clientStreetAddress,
			city: values.clientCity,
			postCode: values.clientPostCode,
			country: values.clientCountry,
		},
		items: values.items.map((item) => ({
			name: item.name,
			quantity: parseInt(item.quantity),
			price: parseFloat(item.price),
			total: parseInt(item.quantity) * parseFloat(item.price),
		})),
		total: values.items.reduce(
			(sum, item) => sum + parseInt(item.quantity) * parseFloat(item.price),
			0
		),
	};
}

function calculatePaymentDue(createdAt, paymentTerms) {
	const dueDate = new Date(createdAt);
	dueDate.setDate(dueDate.getDate() + paymentTerms);
	return dueDate.toISOString().split('T')[0];
}
