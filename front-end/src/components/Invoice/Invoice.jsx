import { formatAmount } from '../../utils/formatAmount';
import { formatDate } from '../../utils/formatDate';

export function Invoice({ invoice }) {
	return (
		<div className='bg-white p-12 rounded-lg w-full shadow-md'>
			<div className='flex justify-between mb-5'>
				<div>
					<h2 className='font-bold text-[15px] text-[#888EB0] mb-2 tracking-[-0.25px]'>
						#<span className='text-[#0C0E16]'>{invoice.id}</span>
					</h2>
					<p className='text-[#7E88C3] text-xs font-medium tracking-[-0.1px]'>
						{invoice.description}
					</p>
				</div>
				<div className='text-right text-[#7E88C3] text-xs leading-5 tracking-[-0.1px] font-medium'>
					<p>{invoice.senderAddress.street}</p>
					<p>{invoice.senderAddress.city}</p>
					<p>{invoice.senderAddress.postCode}</p>
					<p>{invoice.senderAddress.country}</p>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-11'>
				<div className='flex flex-col gap-8'>
					<div className='flex flex-col gap-3'>
						<p className='text-[#7E88C3] text-xs font-medium tracking-[-0.1px]'>
							Invoice Date
						</p>
						<p className='font-bold text-[15px]'>
							{formatDate(invoice.createdAt)}
						</p>
					</div>
					<div className='flex flex-col gap-3'>
						<p className='text-[#7E88C3] text-xs font-medium tracking-[-0.1px]'>
							Payment Due
						</p>
						<p className='font-bold text-[15px]'>
							{formatDate(invoice.paymentDue)}
						</p>
					</div>
				</div>

				<div className='flex flex-col gap-3 text-[#7E88C3] text-xs font-medium leading-5 tracking-[-0.1px]'>
					<p>Bill To</p>
					<div>
						<p className='font-bold mb-2 text-[#0C0E16] text-[15px] tracking-[-0.25px]'>
							{invoice.clientName}
						</p>
						<p>{invoice.clientAddress.street}</p>
						<p>{invoice.clientAddress.city}</p>
						<p>{invoice.clientAddress.postCode}</p>
						<p>{invoice.clientAddress.country}</p>
					</div>
				</div>

				<div className='flex flex-col gap-3 text-[#7E88C3] text-xs font-medium leading-5 tracking-[-0.1px]'>
					<p className=''>Sent to</p>
					<p className='font-bold mb-2 text-[#0C0E16] text-[15px] break-words'>
						{invoice.clientEmail || '---'}
					</p>
				</div>
			</div>

			<div className='bg-[#F9FAFE] rounded-t-lg overflow-hidden p-8 flex flex-col gap-6'>
				<div className='hidden md:grid grid-cols-2 md:grid-cols-5 text-[#7E88C3] text-xs font-medium tracking-[-0.1px]'>
					<div className='text-left md:col-span-2'>Item Name</div>
					<div className='hidden md:block text-center'>QTY.</div>
					<div className='hidden md:block text-right'>Price</div>
					<div className='text-right'>Total</div>
				</div>
				{invoice.items.map((item, index) => (
					<div
						key={index}
						className='grid grid-cols-2 md:grid-cols-5 font-bold  text-[#7E88C3] text-xs tracking-[-0.25px]'>
						<div className='text-[#0C0E16] md:col-span-2'>
							{item.name}
							<div className='md:hidden mt-1'>
								{item.quantity} x £{formatAmount(item.price)}
							</div>
						</div>
						<div className='hidden md:block text-center'>{item.quantity}</div>
						<div className='hidden md:block text-right'>
							£ {formatAmount(item.price)}
						</div>
						<div className='text-right text-[#0C0E16]'>
							£ {formatAmount(item.total)}
						</div>
					</div>
				))}
			</div>

			<div className='bg-[#373B53] text-white rounded-b-lg flex justify-between items-center p-8'>
				<p className='text-xs font-medium tracking-[-0.1px]'>Amount Due</p>
				<p className='text-2xl font-bold tracking-[-0.5px]'>
					£ {formatAmount(invoice.total)}
				</p>
			</div>
		</div>
	);
}
