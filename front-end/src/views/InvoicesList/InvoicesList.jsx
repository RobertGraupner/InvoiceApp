import { useQuery } from '@tanstack/react-query';
import { InvoicesListItem } from '../../components/InvoicesListItem/InvoicesListItem';
import { TopBar } from '../../components/TopBar/TopBar';

export function InvoicesList() {
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
			<ul className='flex flex-col gap-4 justify-center items-center w-full mt-14'>
				{invoices?.map((invoice) => (
					<InvoicesListItem key={invoice.id} invoice={invoice} />
				))}
			</ul>
		</>
	);
}
