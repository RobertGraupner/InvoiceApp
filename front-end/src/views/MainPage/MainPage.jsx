import { InvoicesList } from '../../components/InvoicesList/InvoicesList';
import { TopBar } from '../../components/TopBar/TopBar';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function MainPage() {
	const [selectedFilters, setSelectedFilters] = useState([]);

	const { data: invoices, isLoading } = useQuery({
		queryKey: ['invoices'],
		queryFn: () =>
			fetch('http://localhost:3000/invoices').then((res) => res.json()),
	});
	console.log(invoices);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const filteredInvoices =
		selectedFilters.length > 0
			? invoices.filter((invoice) => selectedFilters.includes(invoice.status))
			: invoices;

	return (
		<>
			<TopBar
				selectedFilters={selectedFilters}
				setSelectedFilters={setSelectedFilters}
				totalInvoices={filteredInvoices.length}
			/>
			<InvoicesList invoices={filteredInvoices} />
		</>
	);
}
