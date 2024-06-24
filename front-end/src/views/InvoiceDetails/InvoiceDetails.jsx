import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ButtonReturn } from '../../components/ButtonReturn/ButtonReturn';
import { TopBarDetails } from '../../components/TopBarDetails/TopBarDetails';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { Invoice } from '../../components/Invoice/Invoice';
import { BACK_END_URL } from '../../constants/api';
import { InvoiceForm } from '../../components/InvoiceForm/InvoiceForm';

export function InvoiceDetails() {
	const [isInvoiceFormVisible, setIsInvoiceFormVisible] = useState(false);

	const handleOpenForm = () => setIsInvoiceFormVisible(true);
	const handleCloseForm = () => setIsInvoiceFormVisible(false);

	const { id } = useParams();

	const { data: invoice, isLoading } = useQuery({
		queryKey: ['invoice', id],
		queryFn: () => fetch(`${BACK_END_URL}/${id}`).then((res) => res.json()),
	});
	console.log(invoice);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<ButtonReturn />
			<TopBarDetails onEditInvoice={handleOpenForm}>
				<StatusBadge status={invoice.status} />
			</TopBarDetails>
			<Invoice invoice={invoice} />
			<InvoiceForm
				isVisible={isInvoiceFormVisible}
				onClose={handleCloseForm}
				mode='edit'
			/>
		</div>
	);
}
