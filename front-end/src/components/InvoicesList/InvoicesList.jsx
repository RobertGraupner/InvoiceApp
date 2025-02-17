import { InvoicesListItem } from '../InvoicesListItem/InvoicesListItem';

export function InvoicesList({ invoices }) {
	return (
		<ul className='flex flex-col gap-4 justify-center items-center w-full mt-14'>
			{invoices?.map((invoice) => (
				<InvoicesListItem key={invoice.invoice_number} invoice={invoice} />
			))}
		</ul>
	);
}
