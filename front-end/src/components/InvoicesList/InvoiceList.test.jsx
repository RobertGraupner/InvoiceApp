import { render, screen } from '@testing-library/react';
import { InvoicesList } from './InvoicesList';

vi.mock('../InvoicesListItem/InvoicesListItem', () => ({
	InvoicesListItem: ({ invoice }) => <li key={invoice.id}>{invoice.id}</li>,
}));

const mockInvoices = [{ id: 'RT3080' }, { id: 'XM9141' }];

describe('InvoicesList', () => {
	it('renders a list of invoices', () => {
		render(<InvoicesList invoices={mockInvoices} />);

		expect(screen.getByText('RT3080')).toBeInTheDocument();
		expect(screen.getByText('XM9141')).toBeInTheDocument();
	});

	it('renders an empty list when there are no invoices', () => {
		const { container } = render(<InvoicesList invoices={[]} />);

		expect(container.firstChild.children).toHaveLength(0);
	});

	it('renders correct number of invoices', () => {
		render(<InvoicesList invoices={mockInvoices} />);

		const invoiceItems = screen.getAllByRole('listitem');
		expect(invoiceItems.length).toBe(mockInvoices.length);
	});
});
