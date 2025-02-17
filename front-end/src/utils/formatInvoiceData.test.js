import { formatInvoiceData } from './formatInvoiceData';

describe('formatInvoiceData', () => {
	const mockData = {
		invoiceDate: new Date('2024-07-12'),
		paymentTerms: 30,
		projectDescription: 'Test Project',
		clientName: 'John Doe',
		clientEmail: 'john@example.com',
		streetAddress: '123 Main St',
		city: 'New York',
		postCode: '10001',
		country: 'USA',
		clientStreetAddress: '456 Elm St',
		clientCity: 'Los Angeles',
		clientPostCode: '90001',
		clientCountry: 'USA',
		items: [
			{ name: 'Item 1', quantity: '2', price: '100' },
			{ name: 'Item 2', quantity: '1', price: '200' },
		],
	};

	it('formats invoice data correctly for new invoice', () => {
		const result = formatInvoiceData(mockData, 'create', false);
		expect(result.created_at).toBe('2024-07-12');
		expect(result.payment_due).toBe('2024-08-11');
		expect(result.description).toBe('Test Project');
		expect(result.client_name).toBe('John Doe');
		expect(result.status).toBe('Pending');
		expect(result.total).toBe(400);
	});

	it('formats invoice data correctly for edit', () => {
		const result = formatInvoiceData(
			{
				...mockData,
				invoice_number: 'RT3080',
				projectDescription: 'Test project 2',
			},
			'edit',
			false
		);
		expect(result.invoice_number).toBe('RT3080');
		expect(result.client_address.city).toBe('Los Angeles');
		expect(result.description).toBe('Test project 2');
		expect(result.items[0].total).toBe(200);
	});

	it('handles draft invoices', () => {
		const result = formatInvoiceData(mockData, 'create', true);
		expect(result.status).toBe('Draft');
	});
});
