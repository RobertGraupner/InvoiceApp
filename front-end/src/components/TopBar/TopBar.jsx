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
			<div className='space-y-1 pl-14'>
				<h1 className='text-3xl font-bold leading-9 tracking-[-1px]'>
					Invoices
				</h1>
				<p className='text-[#888EB0] text-xs leading-4 tracking-[-0.25px]'>
					There are {totalInvoices} total invoices
				</p>
			</div>
			<div className='flex items-center space-x-8'>
				<Dropdown
					selectedFilters={selectedFilters}
					updateFilters={updateFilters}
				/>
				<ButtonIcon
					text='New Invoice'
					bgColor='bg-[#7c5dfa]'
					textColor='text-white'
					hoverBgColor={'hover:bg-[#9277ff]'}
					onAddInvoice={onAddInvoice}
				/>
			</div>
		</div>
	);
}
