import arrowRight from '../../assets/icon-arrow-right.svg';
import { formatAmount } from '../../utils/formatAmount';

export function InvoicesListItem({
	invoice: { id, paymentDue, clientName, total, status },
}) {
	const statusColors = {
		Paid: {
			bg: 'bg-paid-color',
			text: 'text-paid-text',
			dot: 'bg-paid-text',
		},
		Pending: {
			bg: 'bg-pending-color',
			text: 'text-pending-text',
			dot: 'bg-pending-text',
		},
		Draft: {
			bg: 'bg-draft-color',
			text: 'text-draft-text',
			dot: 'bg-draft-text',
		},
	};

	const {
		bg: statusColorBg,
		text: statusColorText,
		dot: statusColorDot,
	} = statusColors[status];

	return (
		<li className='flex items-center justify-between rounded-lg p-4 bg-white w-full cursor-pointer leading-4 tracking-[-0.25px] border border-transparent hover:border-[#7c5dfa]'>
			<div className='flex items-center justify-center text-xs  text-[#888eb0] gap-11'>
				<span>
					#<span className='font-bold m-0 text-[#0c0e16]'>{id}</span>
				</span>
				<span>{paymentDue}</span>
				<span>{clientName}</span>
			</div>
			<div className='flex items-center justify center gap-10'>
				<span className='text-xs font-bold leading-6 tracking-[-0.8px]'>
					{formatAmount(total)}
				</span>
				<div className='flex items-center justify-center'>
					<div
						className={`flex items-center justify-center h-10 w-[104px] gap-2 rounded-md mr-5 ${statusColorBg}`}>
						<div className={`h-2 w-2 rounded-full ${statusColorDot}`}></div>
						<span className={`text-xs font-bold ${statusColorText}`}>
							{status}
						</span>
					</div>
					<img src={arrowRight} alt='Arrow Right' />
				</div>
			</div>
		</li>
	);
}
