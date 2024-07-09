import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BACK_END_URL } from '../constants/api';

export const useInvoiceMutations = () => {
  const queryClient = useQueryClient();

  const addInvoice = useMutation({
    mutationFn: (newInvoice) =>
      fetch(BACK_END_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInvoice),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices']);
    },
  });

  const updateInvoice = useMutation({
    mutationFn: (updatedInvoice) =>
      fetch(`${BACK_END_URL}/${updatedInvoice.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedInvoice),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices']);
    },
  });

  const deleteInvoice = useMutation({
    mutationFn: (id) => fetch(`${BACK_END_URL}/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices']);
    },
  });

  const markAsPaid = useMutation({
    mutationFn: (id) =>
      fetch(`${BACK_END_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Paid' }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['invoice']);
    },
  });

  return { addInvoice, updateInvoice, deleteInvoice, markAsPaid };
};