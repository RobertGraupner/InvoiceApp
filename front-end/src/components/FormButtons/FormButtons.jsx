import { Button } from '../Button/Button';

export function FormButtons({ mode, onClose, onSaveDraft, onSubmit }) {
	return (
		<div
			className={`flex mt-10 gap-2 ${
				mode === 'create' ? 'justify-between' : 'justify-end'
			}`}>
			<Button
				onClick={onClose}
				textColor='text-[#7E88C3]'
				bgColor='bg-[#F9FAFE]'
				hoverBgColor='hover:bg-[#DFE3FA]'>
				Cancel
			</Button>
			<div className='flex gap-2'>
				{mode === 'create' && (
					<Button
						onClick={onSaveDraft}
						textColor='text-[#888EB0]'
						bgColor='bg-[#373B53]'
						hoverBgColor='hover:bg-[#0C0E16]'>
						Save as Draft
					</Button>
				)}
				<Button
					onClick={onSubmit}
					bgColor='bg-[#7C5DFA]'
					hoverBgColor='hover:bg-[#9277FF]'
					textColor='text-white'>
					{mode === 'create' ? 'Save & Send' : 'Save Changes'}
				</Button>
			</div>
		</div>
	);
}
