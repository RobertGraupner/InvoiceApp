import { InvoicesList } from '../../components/InvoicesList/InvoicesList';
import { TopBar } from '../../components/TopBar/TopBar';
import { useQuery } from '@tanstack/react-query';

export function MainPage() {
	const { data: invoices, isLoading } = useQuery({
		queryKey: ['invoices'],
		queryFn: () =>
			fetch('http://localhost:3000/invoices').then((res) => res.json()),
	});
	console.log(invoices);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<TopBar />
			<InvoicesList invoices={invoices} />
		</>
	);
}
