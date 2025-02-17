import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInvoiceMutations } from './useInvoiceMutations';
import { vi } from 'vitest';
import { supabase } from '../lib/supabase';

const mockFrom = {
	insert: vi.fn().mockReturnThis(),
	update: vi.fn().mockReturnThis(),
	delete: vi.fn().mockReturnThis(),
	select: vi.fn().mockReturnThis(),
	single: vi
		.fn()
		.mockResolvedValue({
			data: { invoice_number: 'new-invoice' },
			error: null,
		}),
	eq: vi.fn().mockReturnThis(),
};

// Mock supabase
vi.mock('../lib/supabase', () => ({
	supabase: {
		from: vi.fn(() => mockFrom),
	},
}));

// create a wrapper to provide the query client to the hook
const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
	return ({ children }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe('useInvoiceMutations', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockFrom.single.mockResolvedValue({
			data: { invoice_number: 'new-invoice' },
			error: null,
		});
	});

	it('should add an invoice', async () => {
		const { result } = renderHook(() => useInvoiceMutations(), {
			wrapper: createWrapper(),
		});

		await act(async () => {
			await result.current.addInvoice.mutateAsync({
				invoice_number: 'new-invoice',
			});
		});

		expect(supabase.from).toHaveBeenCalledWith('invoices');
	});

	it('should update an invoice', async () => {
		const { result } = renderHook(() => useInvoiceMutations(), {
			wrapper: createWrapper(),
		});

		await act(async () => {
			await result.current.updateInvoice.mutateAsync({
				invoice_number: 'updated-invoice',
				status: 'Pending',
			});
		});

		expect(supabase.from).toHaveBeenCalledWith('invoices');
	});

	it('should delete an invoice', async () => {
		mockFrom.single.mockResolvedValue({ error: null });

		const { result } = renderHook(() => useInvoiceMutations(), {
			wrapper: createWrapper(),
		});

		await act(async () => {
			await result.current.deleteInvoice.mutateAsync('invoice-to-delete');
		});

		expect(supabase.from).toHaveBeenCalledWith('invoices');
	});

	it('should mark an invoice as paid', async () => {
		mockFrom.single.mockResolvedValue({ error: null });

		const { result } = renderHook(() => useInvoiceMutations(), {
			wrapper: createWrapper(),
		});

		await act(async () => {
			await result.current.markAsPaid.mutateAsync('invoice-to-pay');
		});

		expect(supabase.from).toHaveBeenCalledWith('invoices');
	});
});
