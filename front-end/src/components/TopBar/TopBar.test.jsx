import { render, screen, fireEvent } from '@testing-library/react';
import { TopBar } from './TopBar';

// Mock for the Dropdown and ButtonIcon components to prevent rendering them
vi.mock('../Dropdown/Dropdown', () => ({
	Dropdown: ({ updateFilters }) => (
		<div data-testid='mock-dropdown'>
			<button onClick={updateFilters}>Filter by status</button>
		</div>
	),
}));

vi.mock('../ButtonIcon/ButtonIcon', () => ({
	ButtonIcon: ({ text, onAddInvoice }) => (
		<button onClick={onAddInvoice}>{text}</button>
	),
}));

describe('TopBar', () => {
	const mockUpdateFilters = vi.fn();
	const mockOnAddInvoice = vi.fn();

	it('renders correct number of invoices for desktop', () => {
		render(
			<TopBar
				totalInvoices={7}
				selectedFilters={[]}
				updateFilters={mockUpdateFilters}
				onAddInvoice={mockOnAddInvoice}
			/>
		);
		expect(screen.getByText('There are 7 total invoices')).toBeInTheDocument();
	});

	it('renders "No invoices" when totalInvoices is 0', () => {
		render(
			<TopBar
				totalInvoices={0}
				selectedFilters={[]}
				updateFilters={mockUpdateFilters}
				onAddInvoice={mockOnAddInvoice}
			/>
		);
		expect(screen.getByText('No invoices')).toBeInTheDocument();
	});

	it('renders Dropdown component', () => {
		render(
			<TopBar
				totalInvoices={0}
				selectedFilters={[]}
				updateFilters={mockUpdateFilters}
				onAddInvoice={mockOnAddInvoice}
			/>
		);
		expect(screen.getByTestId('mock-dropdown')).toBeInTheDocument();
	});

	it('renders New Invoice button', () => {
		render(
			<TopBar
				totalInvoices={0}
				selectedFilters={[]}
				updateFilters={mockUpdateFilters}
				onAddInvoice={mockOnAddInvoice}
			/>
		);
		expect(screen.getByText('New Invoice')).toBeInTheDocument();
	});

	it('calls onAddInvoice when New Invoice button is clicked', () => {
		render(
			<TopBar
				totalInvoices={0}
				selectedFilters={[]}
				updateFilters={mockUpdateFilters}
				onAddInvoice={mockOnAddInvoice}
			/>
		);
		fireEvent.click(screen.getByText('New Invoice'));
		expect(mockOnAddInvoice).toHaveBeenCalledTimes(1);
	});

	it('calls updateFilters when dropdown is clicked', () => {
		render(
			<TopBar
				totalInvoices={0}
				selectedFilters={[]}
				updateFilters={mockUpdateFilters}
				onAddInvoice={mockOnAddInvoice}
			/>
		);
		fireEvent.click(screen.getByText('Filter by status'));
		expect(mockUpdateFilters).toHaveBeenCalledTimes(1);
	});
});
