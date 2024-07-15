import { render, screen, fireEvent } from '@testing-library/react';
import { InvoicesListItem } from './InvoicesListItem';
import { MemoryRouter } from 'react-router-dom';

// Mocks
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
	// Import the actual module to get the original useNavigate function and change it to a mock function
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

const mockInvoice = {
	id: 'RT3080',
	paymentDue: '2021-08-19',
	clientName: 'Jensen Huang',
	total: 1800.9,
	status: 'Paid',
};

describe('InvoicesListItem', () => {
	afterEach(() => {
		mockNavigate.mockClear();
	});

	it('renders invoice details correctly', () => {
		render(
			<MemoryRouter>
				<InvoicesListItem invoice={mockInvoice} />
			</MemoryRouter>
		);

		expect(screen.getByText('RT3080')).toBeInTheDocument();
		expect(screen.getByText('Due 19 Aug 2021')).toBeInTheDocument();
		expect(screen.getByText('Jensen Huang')).toBeInTheDocument();
		expect(screen.getByText('£ 1,800.90')).toBeInTheDocument();
		expect(screen.getByText('Paid')).toBeInTheDocument();
	});

	it('calls navigate function when clicked', () => {
		render(
			<MemoryRouter>
				<InvoicesListItem invoice={mockInvoice} />
			</MemoryRouter>
		);

		fireEvent.click(screen.getByRole('listitem'));
		expect(mockNavigate).toHaveBeenCalledWith('/invoice/RT3080');
	});
});
