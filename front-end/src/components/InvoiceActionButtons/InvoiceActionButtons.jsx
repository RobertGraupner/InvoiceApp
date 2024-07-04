import { Button } from '../Button/Button';

export function InvoiceActionButtons({
	onEditInvoice,
	onDeleteInvoice,
	onMarkAsPaid,
	status,
}) {
	return (
		<div className='mx-[-32px] flex justify-between gap-2 bg-white px-8 py-6 dark:bg-[#1E2139] sm:mx-0 sm:justify-end sm:bg-transparent sm:p-0'>
			<Button
				bgColor='bg-[#F9FAFE] dark:bg-[#252945]'
				hoverBgColor='hover:bg-[#DFE3FA] hover:dark:bg-white'
				textColor='text-[#7E88C3] hover:dark:text-[#7E88C3] dark:text-[#DFE3FA]'
				onClick={onEditInvoice}
				className='px-6'>
				Edit
			</Button>
			<Button
				bgColor='bg-[#EC5757]'
				hoverBgColor='hover:bg-[#FF9797]'
				textColor='text-white'
				onClick={onDeleteInvoice}
				className='px-6'>
				Delete
			</Button>
			{status !== 'Paid' && (
				<Button
					bgColor='bg-[#7C5DFA]'
					hoverBgColor='hover:bg-[#9277FF]'
					textColor='text-white'
					onClick={onMarkAsPaid}
					className='px-6'>
					Mark as Paid
				</Button>
			)}
		</div>
	);
}
