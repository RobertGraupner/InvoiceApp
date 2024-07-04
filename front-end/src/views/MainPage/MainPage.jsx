import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { InvoicesList } from '../../components/InvoicesList/InvoicesList';
import { TopBar } from '../../components/TopBar/TopBar';
import { BACK_END_URL } from '../../constants/api';
import { InvoiceForm } from '../../components/InvoiceForm/InvoiceForm';
import { NoInvoices } from '../../components/NoInvoices/NoInvoices';

export function MainPage() {
	const [isInvoiceFormVisible, setIsInvoiceFormVisible] = useState(false);

	const handleOpenForm = () => setIsInvoiceFormVisible(true);
	const handleCloseForm = () => setIsInvoiceFormVisible(false);

	const queryClient = useQueryClient();

	const { data: filters = [] } = useQuery({
		queryKey: ['filters'],
		queryFn: () => [],
		initialData: [],
		staleTime: Infinity,
	});

	const updateFilters = (newFilters) => {
		queryClient.setQueryData(['filters'], newFilters);
	};

	const { data: invoices, isLoading } = useQuery({
		queryKey: ['invoices'],
		queryFn: () => fetch(BACK_END_URL).then((res) => res.json()),
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const filteredInvoices =
		filters.length > 0
			? invoices.filter((invoice) => filters.includes(invoice.status))
			: invoices;

	return (
		<>
			<TopBar
				selectedFilters={filters}
				updateFilters={updateFilters}
				totalInvoices={filteredInvoices.length}
				onAddInvoice={handleOpenForm}
			/>
			{filteredInvoices.length === 0 ? (
				<NoInvoices />
			) : (
				<InvoicesList invoices={filteredInvoices} />
			)}
			<InvoiceForm isVisible={isInvoiceFormVisible} onClose={handleCloseForm} />
		</>
	);
}
