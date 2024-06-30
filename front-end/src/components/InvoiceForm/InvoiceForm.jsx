import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../Button/Button';
import { FormInput } from '../FormInput/FormInput';
import { FormInputItem } from '../FormInputItem/FormInputItem';
import { FormSelect } from '../FormSelect/FormSelect';
import { FormDatePicker } from '../FormDatePicker/FormDatePicker';
import { FormButtons } from '../FormButtons/FormButtons';
import { BACK_END_URL } from '../../constants/api';
import { formatInvoiceData } from '../../utils/formatInvoiceData';
import trash from '../../assets/icon-delete.svg';

export function InvoiceForm({
	isVisible,
	onClose,
	initialData = {},
	mode = 'create',
}) {
	const queryClient = useQueryClient();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: initialData,
		mode: 'onBlur',
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'items',
	});

	const handleAddNewItem = (e) => {
		e.preventDefault();
		append({ name: '', quantity: '', price: '' });
	};

	const addInvoice = useMutation({
		mutationFn: (newInvoice) =>
			fetch(BACK_END_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newInvoice),
			}).then((res) => res.json()),
		onSuccess: () => {
			queryClient.invalidateQueries(['invoices']);
			onClose();
		},
	});

	const onSubmit = (data) => {
		const formattedData = formatInvoiceData(data, mode);
		if (mode === 'create') {
			addInvoice.mutate(formattedData);
		} else {
		}
	};

	const handleSaveDraft = (e) => {
		e.preventDefault();
		console.log('Save as Draft');
	};

	if (!isVisible) return null;

	return (
		<div className='fixed inset-0 left-[103px] flex items-start z-50 bg-black bg-opacity-50'>
			<div className='w-[630px] p-14 h-screen overflow-y-auto rounded-tr-[20px] rounded-br-[20px] bg-white shadow-xl'>
				<form onSubmit={handleSubmit(onSubmit)} className=''>
					<h2 className='text-2xl font-bold tracking-[-0.5px]'>
						{mode === 'create' ? 'New Invoice' : 'Edit Invoice'}
					</h2>
					{/* form input container */}
					<div className='flex flex-col mt-11'>
						<h3 className='font-bold text-[#7C5DFA] tracking-[-0.25px] mb-6'>
							Bill from
						</h3>
						<FormInput
							label='Street Address'
							id='streetAddress'
							register={register}
							errors={errors}
							validationRules={{
								required: `can't be empty`,
							}}
						/>
						<div className='flex gap-6'>
							<FormInput
								label='City'
								id='city'
								register={register}
								errors={errors}
								validationRules={{
									required: `can't be empty`,
								}}
							/>
							<FormInput
								label='Post Code'
								id='postCode'
								register={register}
								errors={errors}
								validationRules={{
									required: `can't be empty`,
								}}
							/>
							<FormInput
								label='Country'
								id='country'
								register={register}
								errors={errors}
								validationRules={{
									required: `can't be empty`,
								}}
							/>
						</div>
					</div>

					<div className='flex flex-col mt-11'>
						<h3 className='font-bold text-[#7C5DFA] tracking-[-0.25px] mb-6'>
							Bill to
						</h3>
						<FormInput
							label='Client’s Name'
							id='clientName'
							register={register}
							errors={errors}
							validationRules={{
								required: `can't be empty`,
							}}
						/>
						<FormInput
							label='Client’s Email'
							id='clientEmail'
							register={register}
							errors={errors}
							validationRules={{
								required: `can't be empty`,
							}}
						/>
						<FormInput
							label='Street Address'
							id='clientStreetAddress'
							register={register}
							errors={errors}
							validationRules={{
								required: `can't be empty`,
							}}
						/>
						<div className='flex gap-6'>
							<FormInput
								label='City'
								id='clientCity'
								register={register}
								errors={errors}
								validationRules={{
									required: `can't be empty`,
								}}
							/>
							<FormInput
								label='Post Code'
								id='clientPostCode'
								register={register}
								errors={errors}
								validationRules={{
									required: `can't be empty`,
								}}
							/>
							<FormInput
								label='Country'
								id='clientCountry'
								register={register}
								errors={errors}
								validationRules={{
									required: `can't be empty`,
								}}
							/>
						</div>

						<div className='flex flex-col mt-11'>
							<div className='flex gap-6'>
								<FormSelect
									label='Payment Terms'
									name='paymentTerms'
									control={control}
									options={[
										'Net 1 Day',
										'Net 7 Days',
										'Net 14 Days',
										'Net 30 Days',
									]}
									validationRules={{
										required: `can't be empty`,
									}}
								/>
								<FormDatePicker
									control={control}
									name='invoiceDate'
									label='Invoice Date'
									validationRules={{
										required: `can't be empty`,
									}}
								/>
							</div>

							<FormInput
								label='Project Description'
								id='projectDescription'
								register={register}
								errors={errors}
								validationRules={{
									required: `can't be empty`,
								}}
							/>
						</div>

						<div className='flex flex-col mt-11'>
							<h3 className='font-bold text-[#7C5DFA] tracking-[-0.25px] mb-6'>
								Item List
							</h3>
							<div className='hidden md:flex justify-between mb-4'>
								<label className='text-xs text-[#7E88C3] w-[214px]'>
									Item Name
								</label>
								<label className='text-xs text-[#7E88C3] w-[46px]'>Qty.</label>
								<label className='text-xs text-[#7E88C3] w-[100px]'>
									Price
								</label>
								<label className='text-xs text-[#7E88C3] w-[56px]'>Total</label>
								<div className='w-[18px]'></div>
							</div>
							{fields.map((field, index) => (
								<div key={field.id} className='flex flex-col md:flex-row mb-4'>
									<div className='w-full md:w-[214px] mb-4 md:mb-2 md:mr-4'>
										<FormInputItem
											register={register}
											errors={errors}
											index={index}
											id='name'
											label='Item Name'
											className='px-5'
											validationRules={{
												required: `can't be empty`,
											}}
										/>
									</div>
									<div className='w-full md:w-[46px] mb-4 md:mb-2 md:mr-4'>
										<FormInputItem
											register={register}
											errors={errors}
											index={index}
											id='quantity'
											label='Qty.'
											className='text-center px-1'
											isNumeric={true}
											validationRules={{ required: true }}
										/>
									</div>
									<div className='w-full md:w-[100px] mb-4 md:mb-2 md:mr-4'>
										<FormInputItem
											register={register}
											errors={errors}
											index={index}
											id='price'
											label='Price'
											className='text-center px-1'
											isNumeric={true}
											validationRules={{ required: true }}
										/>
									</div>
									<div className='w-full md:w-[56px] flex items-center justify-between md:mr-4'>
										<label className='md:hidden text-xs text-[#7E88C3] mr-2'>
											Total
										</label>
										<span
											id={`total-${index}`}
											className='text-xs text-[#888EB0] font-bold tracking-[-0.25px]'>
											0.00
										</span>
									</div>

									<button
										type='button'
										onClick={() => remove(index)}
										className='mt-4 md:mt-0 ml-auto'>
										<img src={trash} alt='Delete' />
									</button>
								</div>
							))}
							<Button
								onClick={handleAddNewItem}
								textColor='text-[#7E88C3]'
								bgColor='bg-[#F9FAFE]'
								hoverBgColor='hover:bg-[#DFE3FA]'
								className='w-full'>
								+ Add New Item
							</Button>
						</div>
					</div>

					{/* button container */}
					<FormButtons
						mode={mode}
						onClose={onClose}
						onSaveDraft={() => {}}
						onSubmit={handleSubmit(onSubmit)}
					/>
				</form>
			</div>
		</div>
	);
}
