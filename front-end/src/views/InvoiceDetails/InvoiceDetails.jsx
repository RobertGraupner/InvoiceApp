import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ButtonReturn } from '../../components/ButtonReturn/ButtonReturn';
import { TopBarDetails } from '../../components/TopBarDetails/TopBarDetails';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { Invoice } from '../../components/Invoice/Invoice';
import { BACK_END_URL } from '../../constants/api';
import { InvoiceForm } from '../../components/InvoiceForm/InvoiceForm';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal';
import { InvoiceActionButtons } from '../../components/InvoiceActionButtons/InvoiceActionButtons';
import { useInvoiceMutations } from '../../hooks/useInvoiceMutations';

export function InvoiceDetails() {
	const [isInvoiceFormVisible, setIsInvoiceFormVisible] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const navigate = useNavigate();
	
	const { id } = useParams();
	const { deleteInvoice, markAsPaid } = useInvoiceMutations();

	const { data: invoice, isLoading } = useQuery({
		queryKey: ['invoice', id],
		queryFn: () => fetch(`${BACK_END_URL}/${id}`).then((res) => res.json()),
	});

	const handleCloseForm = () => setIsInvoiceFormVisible(false);
	const handleEditInvoice = () => setIsInvoiceFormVisible(true);
	const handleDeleteInvoice = () => setIsDeleteModalOpen(true);

	const confirmDelete = () => {
		deleteInvoice.mutate(id, {
			onSuccess: () => {
				setIsDeleteModalOpen(false);
				navigate('/');
			},
		});
	};

	const handleMarkAsPaid = () => {
		markAsPaid.mutate(id, {
			onSuccess: () => {
				navigate('/');
			},
		}
		);
	};

	if (isLoading) {
		return <p>Loading...</p>;
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
				invoiceId={id}
			/>
		</div>
	);
}
