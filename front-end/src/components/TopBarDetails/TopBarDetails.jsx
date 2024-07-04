import { InvoiceActionButtons } from '../InvoiceActionButtons/InvoiceActionButtons';

export function TopBarDetails({
	children,
	onEditInvoice,
	onDeleteInvoice,
	onMarkAsPaid,
	status,
}) {
	return (
		<div className='mb-6 mt-8 flex w-full items-center justify-between rounded-lg border border-transparent bg-white dark:bg-[#1E2139] px-8 py-5 tracking-[-0.25px] shadow-md'>
			<div className='flex w-full items-center justify-between gap-5 sm:w-auto sm:justify-start'>
				<p className='text-xs font-medium leading-4 tracking-widest text-[#858BB2] dark:text-[#858BB2]'>
					Status
				</p>
				{children}
			</div>
			<div className='hidden sm:block'>
				<InvoiceActionButtons
					onEditInvoice={onEditInvoice}
					onDeleteInvoice={onDeleteInvoice}
					onMarkAsPaid={onMarkAsPaid}
					status={status}
				/>
			</div>
		</div>
	);
}
