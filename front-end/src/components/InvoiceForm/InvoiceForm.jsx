import { useForm } from 'react-hook-form';
import { Button } from '../Button/Button';

export function InvoiceForm({
	isVisible,
	onClose,
	initialData = {},
	mode = 'create',
}) {
	const { register, handleSubmit, reset } = useForm({
		defaultValues: initialData,
	});

	const onSubmit = (data) => {
		console.log(data);

		onClose();
	};

	if (!isVisible) return null;

	return (
		<div className='fixed inset-0 left-[103px] flex items-start z-50 bg-black bg-opacity-50'>
			<div className='w-[616px] p-14 h-screen overflow-y-auto rounded-tr-[20px] rounded-br-[20px] bg-white shadow-xl'>
				<form onSubmit={handleSubmit(onSubmit)} className=''>
					<h2 className='text-2xl font-bold tracking-[-0.5px]'>
						{mode === 'create' ? 'New Invoice' : 'Edit Invoice'}
					</h2>

					{/* form input container */}
					<div className=''></div>

					{/* button container */}
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
									textColor='text-[#888EB0]'
									bgColor='bg-[#373B53]'
									hoverBgColor='hover:bg-[#0C0E16]'>
									Save as Draft
								</Button>
							)}
							<Button
								bgColor='bg-[#7C5DFA]'
								hoverBgColor='hover:bg-[#9277FF]'
								textColor='text-white'>
								{mode === 'create' ? 'Save & Send' : 'Save Changes'}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
