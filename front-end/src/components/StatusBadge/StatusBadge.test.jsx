import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
	it('renders with correct text', () => {
		render(<StatusBadge status='Paid' />);
		expect(screen.getByText('Paid')).toBeInTheDocument();
	});

	it('applies correct classes for Paid status', () => {
		render(<StatusBadge status='Paid' />);
		const badge = screen.getByText('Paid');
		expect(badge).toHaveClass('text-paid-text');
		expect(badge.previousElementSibling).toHaveClass('bg-paid-text');
		expect(badge.parentElement).toHaveClass('bg-paid-color');
	});

	it('applies correct classes for Pending status', () => {
		render(<StatusBadge status='Pending' />);
		const badge = screen.getByText('Pending');
		expect(badge).toHaveClass('text-pending-text');
		expect(badge.previousElementSibling).toHaveClass('bg-pending-text');
		expect(badge.parentElement).toHaveClass('bg-pending-color');
	});

	it('applies correct classes for Draft status', () => {
		render(<StatusBadge status='Draft' />);
		const badge = screen.getByText('Draft');
		expect(badge).toHaveClass('text-draft-text', 'dark:text-[#DFE3FA]');
		expect(badge.previousElementSibling).toHaveClass(
			'bg-draft-text',
			'dark:bg-[#DFE3FA]'
		);
		expect(badge.parentElement).toHaveClass(
			'bg-draft-color',
			'dark:bg-[rgba(223,227,250,0.06)]'
		);
	});
});
