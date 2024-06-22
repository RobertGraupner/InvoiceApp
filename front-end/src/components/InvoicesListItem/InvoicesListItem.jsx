import { useNavigate } from 'react-router-dom';
import arrowRight from '../../assets/icon-arrow-right.svg';
import { formatAmount } from '../../utils/formatAmount';
import { formatDate } from '../../utils/formatDate';
import { StatusBadge } from '../StatusBadge/StatusBadge';

export function InvoicesListItem({
	invoice: { id, paymentDue, clientName, total, status },
}) {
	// hook to navigate to the invoice details page without Link component
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/invoice/${id}`);
	};

	return (
		<li
			className='flex items-center justify-between gap-10 rounded-lg p-4 bg-white w-full cursor-pointer leading-4 tracking-[-0.25px] border border-transparent hover:border-[#7c5dfa] shadow-md'
			onClick={handleClick}>
			<div className='flex items-center justify-center text-xs font-medium tracking-[-0.1px] text-[#7E88C3] gap-11'>
				<span>
					#<span className='font-bold m-0 text-[#0c0e16]'>{id}</span>
				</span>
				<span>Due {formatDate(paymentDue)}</span>
				<span>{clientName}</span>
			</div>
			<div className='flex items-center justify center gap-10'>
				<span className='text-xs font-bold leading-6 tracking-[-0.8px]'>
					£ {formatAmount(total)}
				</span>
				<div className='flex items-center justify-center'>
					<StatusBadge status={status} />
					<img src={arrowRight} alt='Arrow Right' />
				</div>
			</div>
		</li>
	);
}
