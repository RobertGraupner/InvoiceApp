import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { Dropdown } from '../Dropdown/Dropdown';

export function TopBar({
	totalInvoices,
	selectedFilters,
	updateFilters,
	onAddInvoice,
}) {
	return (
		<div className='flex items-center justify-between'>
			<div className='space-y-1'>
				<h1 className='text-2xl font-bold leading-9 tracking-[-1px] dark:text-white sm:text-3xl'>
					Invoices
				</h1>
				<p className='hidden text-xs leading-4 tracking-[-0.25px] text-[#888EB0] dark:text-[#DFE3FA] sm:inline'>
					{totalInvoices === 0
						? 'No invoices'
						: `There are ${totalInvoices} total invoices`}
				</p>
				<p className='text-xs leading-4 tracking-[-0.25px] text-[#888EB0] sm:hidden'>
					{totalInvoices} invoices
				</p>
			</div>
			<div className='flex items-center space-x-8'>
				<Dropdown
					selectedFilters={selectedFilters}
					updateFilters={updateFilters}
				/>
				<ButtonIcon
					text='New Invoice'
					mobileText='New'
					bgColor='bg-[#7c5dfa]'
					textColor='text-white'
					hoverBgColor={'hover:bg-[#9277ff]'}
					onAddInvoice={onAddInvoice}
				/>
			</div>
		</div>
	);
}
