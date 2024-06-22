import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ButtonReturn } from '../../components/ButtonReturn/ButtonReturn';
import { TopBarDetails } from '../../components/TopBarDetails/TopBarDetails';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { Invoice } from '../../components/Invoice/Invoice';
import { BACK_END_URL } from '../../constants/api';

export function InvoiceDetails() {
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
			<TopBarDetails>
				<StatusBadge status={invoice.status} />
			</TopBarDetails>
			<Invoice invoice={invoice} />
		</div>
	);
}
