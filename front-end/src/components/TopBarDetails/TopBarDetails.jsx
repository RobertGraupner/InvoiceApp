import { Button } from '../Button/Button';

export function TopBarDetails({ children, onEditInvoice }) {
	return (
		<div className='flex items-center justify-between rounded-lg py-5 px-8 bg-white w-full tracking-[-0.25px] border border-transparent mt-8 mb-6 shadow-md'>
			<div className='flex items-center gap-5'>
				<p className='leading-4 tracking-widest font-medium text-xs text-[#858BB2]'>
					Status
				</p>
				{children}
			</div>
			<div className='flex gap-2'>
				<Button
					bgColor='bg-[#F9FAFE]'
					hoverBgColor='hover:bg-[#DFE3FA]'
					textColor='text-[#7E88C3]'
					onClick={onEditInvoice}>
					Edit
				</Button>
				<Button
					bgColor='bg-[#EC5757]'
					hoverBgColor='hover:bg-[#FF9797]'
					textColor='text-white'>
					Delete
				</Button>
				<Button
					bgColor='bg-[#7C5DFA]'
					hoverBgColor='hover:bg-[#9277FF]'
					textColor='text-white'>
					Mark as Paid
				</Button>
			</div>
		</div>
	);
}
