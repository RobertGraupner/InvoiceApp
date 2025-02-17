import { getDefaultInvoiceValues } from './getDefaultInvoiceValues';

describe('getDefaultInvoiceValues', () => {
	it('returns default values for create mode', () => {
		const result = getDefaultInvoiceValues();
		expect(result).toEqual({
			items: [{ name: '', quantity: '', price: '' }],
		});
	});

	it('returns formatted values for edit mode', () => {
		const initialData = {
			invoice_number: 'RT3080',
			created_at: '2021-08-21',
			payment_terms: 30,
			description: 'Test Project',
			client_name: 'John Doe',
			client_email: 'john@example.com',
			status: 'Pending',
			sender_address: {
				street: '123 Main St',
				city: 'New York',
				postCode: '10001',
				country: 'USA',
			},
			client_address: {
				street: '456 Elm St',
				city: 'Los Angeles',
				postCode: '90001',
				country: 'USA',
			},
			items: [
				{ name: 'Item 1', quantity: 2, price: 100 },
				{ name: 'Item 2', quantity: 1, price: 200 },
			],
		};

		const result = getDefaultInvoiceValues('edit', initialData);

		expect(result).toEqual({
			invoice_number: 'RT3080',
			invoiceDate: expect.any(Date),
			paymentTerms: 30,
			projectDescription: 'Test Project',
			clientName: 'John Doe',
			clientEmail: 'john@example.com',
			status: 'Pending',
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
		});
	});

	it('handles missing data in edit mode', () => {
		const initialData = {
			invoice_number: 'RT3080',
			created_at: '2024-07-12',
			status: 'Draft',
		};

		const result = getDefaultInvoiceValues('edit', initialData);

		expect(result).toEqual({
			invoice_number: 'RT3080',
			invoiceDate: expect.any(Date),
			paymentTerms: undefined,
			projectDescription: undefined,
			clientName: undefined,
			clientEmail: undefined,
			status: 'Draft',
			streetAddress: undefined,
			city: undefined,
			postCode: undefined,
			country: undefined,
			clientStreetAddress: undefined,
			clientCity: undefined,
			clientPostCode: undefined,
			clientCountry: undefined,
			items: [{ name: '', quantity: '', price: '' }],
		});
	});
});
