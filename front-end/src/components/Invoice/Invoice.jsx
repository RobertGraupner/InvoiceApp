import { formatAmount } from '../../utils/formatAmount';
import { formatDate } from '../../utils/formatDate';

export function Invoice({ invoice }) {
	return (
		<div className='mb-6 w-full rounded-lg bg-white p-6 shadow-md dark:bg-[#1E2139] sm:p-12'>
			<div className='mb-5 flex flex-col sm:flex-row sm:justify-between'>
				<div>
					<h2 className='mb-2 text-[15px] font-bold tracking-[-0.25px] text-[#888EB0]'>
						#
						<span className='text-[#0C0E16] dark:text-white'>
							{invoice.invoice_number}
						</span>
					</h2>
					<p className='text-xs font-medium tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA]'>
						{invoice.description}
					</p>
				</div>
				<div className='pt-4 text-xs font-medium leading-5 tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA] sm:pt-0 sm:text-right'>
					<p>{invoice.sender_address.street}</p>
					<p>{invoice.sender_address.city}</p>
					<p>{invoice.sender_address.postCode}</p>
					<p>{invoice.sender_address.country}</p>
				</div>
			</div>

			<div className='mb-11 grid grid-cols-2 gap-6 sm:grid-cols-3'>
				<div className='flex flex-col gap-8'>
					<div className='flex flex-col gap-3'>
						<p className='text-xs font-medium tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA]'>
							Invoice Date
						</p>
						<p className='text-[15px] font-bold dark:text-white'>
							{formatDate(invoice.created_at)}
						</p>
					</div>
					<div className='flex flex-col gap-3'>
						<p className='text-xs font-medium tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA]'>
							Payment Due
						</p>
						<p className='text-[15px] font-bold dark:text-white'>
							{formatDate(invoice.payment_due)}
						</p>
					</div>
				</div>

				<div className='flex flex-col gap-3 text-xs font-medium leading-5 tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA]'>
					<p>Bill To</p>
					<div>
						<p className='mb-2 text-[15px] font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white'>
							{invoice.clientName}
						</p>
						<p>{invoice.client_address.street}</p>
						<p>{invoice.client_address.city}</p>
						<p>{invoice.client_address.postCode}</p>
						<p>{invoice.client_address.country}</p>
					</div>
				</div>

				<div className='col-span-2 flex flex-col gap-3 text-xs font-medium leading-5 tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA] sm:col-span-1'>
					<p className=''>Sent to</p>
					<p className='mb-2 break-words text-[15px] font-bold text-[#0C0E16] dark:text-white'>
						{invoice.client_email || '---'}
					</p>
				</div>
			</div>

			<div className='flex flex-col gap-6 overflow-hidden rounded-t-lg bg-[#F9FAFE] dark:bg-[#252945] p-8'>
				<div className='hidden grid-cols-2 text-xs font-medium tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA] sm:grid sm:grid-cols-5'>
					<div className='text-left sm:col-span-2'>Item Name</div>
					<div className='hidden text-center sm:block'>QTY.</div>
					<div className='hidden text-right sm:block'>Price</div>
					<div className='text-right'>Total</div>
				</div>
				{invoice.items?.map((item, index) => (
					<div
						key={index}
						className='grid grid-cols-2 text-xs font-bold  tracking-[-0.25px] text-[#7E88C3] dark:text-[#DFE3FA] sm:grid-cols-5'>
						<div className='text-[#0C0E16] dark:text-white sm:col-span-2'>
							{item.name}
							<div className='mt-1 text-[#7E88C3] sm:hidden'>
								{item.quantity} x £{formatAmount(item.price)}
							</div>
						</div>
						<div className='hidden text-center sm:block'>{item.quantity}</div>
						<div className='hidden text-right sm:block'>
							£ {formatAmount(item.price)}
						</div>
						<div className='flex items-center justify-end text-right text-[#0C0E16] dark:text-white sm:block'>
							£ {formatAmount(item.total)}
						</div>
					</div>
				))}
			</div>

			<div className='flex items-center justify-between rounded-b-lg bg-[#373B53] p-8 text-white dark:bg-[#0C0E16]'>
				<p className='text-xs font-medium tracking-[-0.1px]'>Amount Due</p>
				<p className='text-md font-bold tracking-[-0.5px] sm:text-2xl'>
					£ {formatAmount(invoice.total)}
				</p>
			</div>
		</div>
	);
}
