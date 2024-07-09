import { Button } from '../Button/Button';

export function FormButtons({ mode, onClose, onSaveDraft, onSubmit }) {
	return (
		<div
			className={`flex mt-10 gap-2 ${
				mode === 'create' ? 'justify-between' : 'justify-end'
			}`}>
			<Button
				onClick={onClose}
				textColor='text-[#7E88C3] dark:text-[#DFE3FA] dark:hover:text-[#7E88C3]'
				bgColor='bg-[#F9FAFE] dark:bg-[#252945]'
				hoverBgColor='hover:bg-[#DFE3FA] dark:hover:bg-white'
				className='px-4 sm:px-6'>
				Cancel
			</Button>
			<div className='flex gap-2'>
				{mode === 'create' && (
					<Button
						onClick={onSaveDraft}
						type='button'
						textColor='text-[#888EB0] dark:text-[#DFE3FA]'
						bgColor='bg-[#373B53]'
						hoverBgColor='hover:bg-[#0C0E16] dark:hover:bg-[#1E2139]'
						className='px-4 sm:px-6'>
						Save as Draft
					</Button>
				)}
				<Button
					onClick={onSubmit}
					bgColor='bg-[#7C5DFA]'
					hoverBgColor='hover:bg-[#9277FF]'
					textColor='text-white'
					className='px-4 sm:px-6'>
					{mode === 'create' ? 'Save & Send' : 'Save Changes'}
				</Button>
			</div>
		</div>
	);
}
