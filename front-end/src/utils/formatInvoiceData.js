import { v4 as uuidv4 } from 'uuid';

export function formatInvoiceData(values, mode, isDraft) {
	return {
		...(mode === 'edit'
			? { id: values.id }
			: { id: uuidv4().slice(0, 6).toUpperCase() }),
		createdAt: values.invoiceDate
			? adjustForTimezone(values.invoiceDate).toISOString().split('T')[0]
			: adjustForTimezone(new Date()).toISOString().split('T')[0],
		paymentDue: calculatePaymentDue(
			values.invoiceDate
				? adjustForTimezone(values.invoiceDate)
				: adjustForTimezone(new Date()),
			values.paymentTerms
		),
		description: values.projectDescription || '',
		paymentTerms: values.paymentTerms || 30,
		clientName: values.clientName || '',
		clientEmail: values.clientEmail || '',
		status: isDraft
			? 'Draft'
			: mode === 'edit'
			? values.status === 'Draft'
				? 'Pending'
				: values.status
			: 'Pending',
		senderAddress: {
			street: values.streetAddress || '',
			city: values.city || '',
			postCode: values.postCode || '',
			country: values.country || '',
		},
		clientAddress: {
			street: values.clientStreetAddress || '',
			city: values.clientCity || '',
			postCode: values.clientPostCode || '',
			country: values.clientCountry || '',
		},
		items: (values.items || []).map((item) => ({
			name: item.name || '',
			quantity: parseInt(item.quantity) || 0,
			price: parseFloat(item.price) || 0,
			total: (parseInt(item.quantity) || 0) * (parseFloat(item.price) || 0),
		})),
		total: (values.items || []).reduce(
			(sum, item) =>
				sum + (parseInt(item.quantity) || 0) * (parseFloat(item.price) || 0),
			0
		),
	};
}

function calculatePaymentDue(createdAt, paymentTerms) {
	const dueDate = new Date(createdAt);
	dueDate.setDate(dueDate.getDate() + (paymentTerms || 30));
	return adjustForTimezone(dueDate).toISOString().split('T')[0];
}

function adjustForTimezone(date) {
	const newDate = new Date(date);
	newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
	return newDate;
}
