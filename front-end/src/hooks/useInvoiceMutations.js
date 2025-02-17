import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export const useInvoiceMutations = () => {
	const queryClient = useQueryClient();

	const addInvoice = useMutation({
		mutationFn: async (newInvoice) => {
			const { data, error } = await supabase
				.from('invoices')
				.insert(newInvoice)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['invoices']);
		},
	});

	const updateInvoice = useMutation({
		mutationFn: async (updatedInvoice) => {
			const { data, error } = await supabase
				.from('invoices')
				.update(updatedInvoice)
				.eq('invoice_number', updatedInvoice.invoice_number)
				.select();
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['invoices']);
		},
	});

	const deleteInvoice = useMutation({
		mutationFn: async (invoice_number) => {
			const { error } = await supabase
				.from('invoices')
				.delete()
				.eq('invoice_number', invoice_number);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['invoices']);
		},
	});

	const markAsPaid = useMutation({
		mutationFn: async (invoice_number) => {
			const { error } = await supabase
				.from('invoices')
				.update({ status: 'Paid' })
				.eq('invoice_number', invoice_number);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['invoices']);
		},
	});

	return { addInvoice, updateInvoice, deleteInvoice, markAsPaid };
};
