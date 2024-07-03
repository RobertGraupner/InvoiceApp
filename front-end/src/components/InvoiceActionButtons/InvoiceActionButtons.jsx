import { Button } from '../Button/Button';

export function InvoiceActionButtons({
	onEditInvoice,
	onDeleteInvoice,
	onMarkAsPaid,
	status,
}) {
	return (
		<div className='mx-[-32px] flex justify-between gap-2 bg-white px-8 py-6 sm:mx-0 sm:justify-end sm:bg-transparent sm:p-0'>
			<Button
				bgColor='bg-[#F9FAFE]'
				hoverBgColor='hover:bg-[#DFE3FA]'
				textColor='text-[#7E88C3]'
				onClick={onEditInvoice}>
				Edit
			</Button>
			<Button
				bgColor='bg-[#EC5757]'
				hoverBgColor='hover:bg-[#FF9797]'
				textColor='text-white'
				onClick={onDeleteInvoice}>
				Delete
			</Button>
			{status !== 'Paid' && (
				<Button
					bgColor='bg-[#7C5DFA]'
					hoverBgColor='hover:bg-[#9277FF]'
					textColor='text-white'
					onClick={onMarkAsPaid}>
					Mark as Paid
				</Button>
			)}
		</div>
	);
}
