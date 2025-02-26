import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ButtonReturn } from '../../components/ButtonReturn/ButtonReturn';
import { TopBarDetails } from '../../components/TopBarDetails/TopBarDetails';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { Invoice } from '../../components/Invoice/Invoice';
import { InvoiceForm } from '../../components/InvoiceForm/InvoiceForm';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal';
import { InvoiceActionButtons } from '../../components/InvoiceActionButtons/InvoiceActionButtons';
import { useInvoiceMutations } from '../../hooks/useInvoiceMutations';
import { supabase } from '../../lib/supabase';

export function InvoiceDetails() {
	const [isInvoiceFormVisible, setIsInvoiceFormVisible] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const navigate = useNavigate();
	const { invoice_number } = useParams();
	const { deleteInvoice, markAsPaid } = useInvoiceMutations();

	const {
		data: invoice,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['invoice', invoice_number],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('invoices')
				.select('*')
				.eq('invoice_number', invoice_number)
				.single();

			if (error) throw new Error('Invoice not found');
			return data;
		},
		retry: false,
	});

	useEffect(() => {
		if (isError) {
			console.log('Error:', error.message);
			// we add replace: true to avoid adding the error page to the history
			navigate('/', { replace: true });
		}
	}, [isError, navigate]);

	const handleCloseForm = () => setIsInvoiceFormVisible(false);
	const handleEditInvoice = () => setIsInvoiceFormVisible(true);
	const handleDeleteInvoice = () => setIsDeleteModalOpen(true);

	const confirmDelete = () => {
		deleteInvoice.mutate(invoice_number, {
			onSuccess: () => {
				setIsDeleteModalOpen(false);
				navigate('/');
			},
		});
	};

	const handleMarkAsPaid = () => {
		markAsPaid.mutate(invoice_number, {
			onSuccess: () => {
				navigate('/');
			},
		});
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return null;
	}

	return (
		<div>
			<ButtonReturn />
			<TopBarDetails
				onEditInvoice={handleEditInvoice}
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
			<div className='sm:hidden'>
				<InvoiceActionButtons
					onEditInvoice={handleEditInvoice}
					onDeleteInvoice={handleDeleteInvoice}
					onMarkAsPaid={handleMarkAsPaid}
					status={invoice.status}
				/>
			</div>
			<DeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={confirmDelete}
				invoiceNumber={invoice_number}
			/>
		</div>
	);
}
