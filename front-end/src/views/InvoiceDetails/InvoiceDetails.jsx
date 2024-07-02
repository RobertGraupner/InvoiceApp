import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ButtonReturn } from '../../components/ButtonReturn/ButtonReturn';
import { TopBarDetails } from '../../components/TopBarDetails/TopBarDetails';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { Invoice } from '../../components/Invoice/Invoice';
import { BACK_END_URL } from '../../constants/api';
import { InvoiceForm } from '../../components/InvoiceForm/InvoiceForm';

export function InvoiceDetails() {
	const [isInvoiceFormVisible, setIsInvoiceFormVisible] = useState(false);

	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const { id } = useParams();

	const { data: invoice, isLoading } = useQuery({
		queryKey: ['invoice', id],
		queryFn: () => fetch(`${BACK_END_URL}/${id}`).then((res) => res.json()),
	});

	const handleCloseForm = () => setIsInvoiceFormVisible(false);

	const handleEditInvoice = () => {
		setIsInvoiceFormVisible(true);
	};

	const deleteInvoice = useMutation({
		mutationFn: () => fetch(`${BACK_END_URL}/${id}`, { method: 'DELETE' }),
		onSuccess: () => {
			queryClient.invalidateQueries(['invoices']);
			navigate('/');
		},
	});

	const handleDeleteInvoice = () => {
		if (window.confirm('Are you sure you want to delete this invoice?')) {
			deleteInvoice.mutate();
		}
	};

	const markAsPaid = useMutation({
		mutationFn: () =>
			fetch(`${BACK_END_URL}/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: 'Paid' }),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries(['invoice', id]);
		},
	});

	const handleMarkAsPaid = () => {
		markAsPaid.mutate();
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<ButtonReturn />
			<TopBarDetails
				onEditInvoice={() => handleEditInvoice(invoice)}
				onDeleteInvoice={handleDeleteInvoice}
				onMarkAsPaid={handleMarkAsPaid}
				status={invoice.status}>
				<StatusBadge status={invoice.status} />
			</TopBarDetails>
			<Invoice invoice={invoice} />
			<InvoiceForm
				isVisible={isInvoiceFormVisible}
				onClose={handleCloseForm}
				initialData={invoice}
				mode='edit'
			/>
		</div>
	);
}
