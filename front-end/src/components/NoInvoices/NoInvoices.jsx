import emptyIcon from '../../assets/illustration-empty.svg';

export function NoInvoices() {
	return (
		<div className='mt-24 flex flex-col items-center justify-center text-center'>
			<img
				src={emptyIcon}
				alt='No invoices'
				className='mb-16 w-[190px] sm:w-[240px]'
			/>
			<h2 className='mb-6 text-xl font-bold leading-normal tracking-[-0.75px] dark:text-white'>
				There is nothing here
			</h2>
			<p className='max-w-[240px] text-xs font-medium tracking-[-0.1px] text-[#888EB0] dark:text-[#DFE3FA]'>
				Create an invoice by clicking the
				<span className='font-bold'> New Invoice </span>
				button and get started
			</p>
		</div>
	);
}
