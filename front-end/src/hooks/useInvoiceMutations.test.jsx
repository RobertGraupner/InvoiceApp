import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInvoiceMutations } from './useInvoiceMutations';

// mock fetch to avoid making real requests
global.fetch = vi.fn();

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
		fetch.mockClear();
	});

	it('should add an invoice', async () => {
		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ id: 'new-invoice' }),
		});
		// renderHook will render the hook outside react component and return its result
		const { result } = renderHook(() => useInvoiceMutations(), {
			wrapper: createWrapper(),
		});
		// act will run the function that changes the state
		await act(async () => {
			await result.current.addInvoice.mutateAsync({ id: 'new-invoice' });
		});

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: 'new-invoice' }),
			})
		);
	});

	it('should update an invoice', async () => {
		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ id: 'updated-invoice' }),
		});

		const { result } = renderHook(() => useInvoiceMutations(), {
			wrapper: createWrapper(),
		});

		await act(async () => {
			await result.current.updateInvoice.mutateAsync({ id: 'updated-invoice' });
		});

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining('updated-invoice'),
			expect.objectContaining({
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: 'updated-invoice' }),
			})
		);
	});

	it('should delete an invoice', async () => {
		fetch.mockResolvedValueOnce({ ok: true });

		const { result } = renderHook(() => useInvoiceMutations(), {
			wrapper: createWrapper(),
		});

		await act(async () => {
			await result.current.deleteInvoice.mutateAsync('invoice-to-delete');
		});

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining('invoice-to-delete'),
			expect.objectContaining({
				method: 'DELETE',
			})
		);
	});

	it('should mark an invoice as paid', async () => {
		fetch.mockResolvedValueOnce({ ok: true });

		const { result } = renderHook(() => useInvoiceMutations(), {
			wrapper: createWrapper(),
		});

		await act(async () => {
			await result.current.markAsPaid.mutateAsync('invoice-to-pay');
		});

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining('invoice-to-pay'),
			expect.objectContaining({
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: 'Paid' }),
			})
		);
	});
});
