import { useNavigate } from 'react-router-dom';
import arrowRight from '../../assets/icon-arrow-right.svg';
import { formatAmount } from '../../utils/formatAmount';
import { formatDate } from '../../utils/formatDate';
import { StatusBadge } from '../StatusBadge/StatusBadge';

export function InvoicesListItem({
	invoice: { invoice_number, payment_due, client_name, total, status },
}) {
	// hook to navigate to the invoice details page without Link component
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/invoice/${invoice_number}`);
	};

	return (
		<li
			className='flex flex-col sm:flex-row sm:items-center justify-between rounded-lg p-4 dark:bg-[#1E2139] bg-white w-full cursor-pointer leading-4 tracking-[-0.25px] border border-transparent hover:border-[#7c5dfa] shadow-md'
			onClick={handleClick}>
			<div className='flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-start text-xs font-medium tracking-[-0.1px] text-[#7E88C3] gap-4 md:gap-11 mb-2 sm:mb-0'>
				<span className='dark:text-[#888EB0]'>
					#
					<span className='text-[#0c0e16] font-bold dark:text-white'>
						{invoice_number}
					</span>
				</span>
				<span className='order-3 sm:order-none w-full sm:w-auto dark:text-[#DFE3FA]'>
					Due {formatDate(payment_due)}
				</span>
				<span className='text-right dark:text-white sm:text-left'>
					{client_name}
				</span>
			</div>
			<div className='flex items-center justify-between gap-4 sm:justify-end sm:gap-10'>
				<span className='text-xs font-bold leading-6 tracking-[-0.8px] dark:text-white'>
					£ {formatAmount(total)}
				</span>
				<div className='flex items-center'>
					<StatusBadge status={status} />
					<img
						src={arrowRight}
						alt='Arrow Right'
						className='hidden sm:inline'
					/>
				</div>
			</div>
		</li>
	);
}
