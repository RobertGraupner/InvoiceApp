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
				<h1 className='sm:text-3xl text-2xl font-bold leading-9 tracking-[-1px]'>
					Invoices
				</h1>
				<p className='text-[#888EB0] text-xs leading-4 tracking-[-0.25px] hidden sm:inline'>
					There are {totalInvoices} total invoices
				</p>
				<p className='text-[#888EB0] text-xs leading-4 tracking-[-0.25px] sm:hidden'>
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
