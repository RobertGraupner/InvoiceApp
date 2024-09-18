export const BACK_END_URL =
	process.env.NODE_ENV === 'production'
		? 'https://invoiceapp-backend.onrender.com/invoices'
		: 'http://localhost:3000/invoices';
