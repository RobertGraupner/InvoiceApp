import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Button } from '../Button/Button';
import { FormInput } from '../FormInput/FormInput';
import { FormInputItem } from '../FormInputItem/FormInputItem';
import { FormSelect } from '../FormSelect/FormSelect';
import { FormDatePicker } from '../FormDatePicker/FormDatePicker';
import { FormButtons } from '../FormButtons/FormButtons';
import { BACK_END_URL } from '../../constants/api';
import { formatInvoiceData } from '../../utils/formatInvoiceData';
import { createPortal } from 'react-dom';
import trash from '../../assets/icon-delete.svg';

const paymentTermsMap = {
	1: 'Net 1 Day',
	7: 'Net 7 Days',
	14: 'Net 14 Days',
	30: 'Net 30 Days',
};

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
		reset,
	} = useForm({
		defaultValues: initialData,
		mode: 'onBlur',
	});

	useEffect(() => {
		if (mode === 'edit' && initialData) {
			reset({
				id: initialData.id,
				invoiceDate: new Date(initialData.createdAt),
				paymentTerms: paymentTermsMap[initialData.paymentTerms],
				projectDescription: initialData.description,
				clientName: initialData.clientName,
				clientEmail: initialData.clientEmail,
				status: initialData.status,
				streetAddress: initialData.senderAddress.street,
				city: initialData.senderAddress.city,
				postCode: initialData.senderAddress.postCode,
				country: initialData.senderAddress.country,
				clientStreetAddress: initialData.clientAddress.street,
				clientCity: initialData.clientAddress.city,
				clientPostCode: initialData.clientAddress.postCode,
				clientCountry: initialData.clientAddress.country,
				items: initialData.items.map((item) => ({
					name: item.name,
					quantity: item.quantity.toString(),
					price: item.price.toString(),
				})),
			});
		}
	}, [initialData, mode, reset]);

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

	const updateInvoice = useMutation({
		mutationFn: (updatedInvoice) =>
			fetch(`${BACK_END_URL}/${updatedInvoice.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedInvoice),
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
			updateInvoice.mutate(formattedData);
		}
		reset();
	};

	const handleSaveDraft = (e) => {
		e.preventDefault();
		console.log('Save as Draft');
	};

	if (!isVisible) return null;

	return createPortal(
		<div className='fixed inset-0 md:left-[103px] flex items-start z-50 bg-black bg-opacity-50'>
			<div className='w-[630px] p-6 sm:p-14 max-h-screen overflow-y-auto scrollbar-hide sm:rounded-tr-[20px] sm:rounded-br-[20px] bg-white shadow-xl'>
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
						<div className='flex flex-col sm:flex-row sm:gap-6'>
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
							</div>
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

					<div className='flex flex-col mt-4 ms:mt-11'>
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
						<div className='flex flex-col sm:flex-row sm:gap-6'>
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
							</div>
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

						<div className='flex flex-col sm:mt-11'>
							<div className='flex flex-col sm:gap-6'>
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

						<div className='mt-10'>
							<h3 className='font-bold text-lg text-[#777F98] mb-6'>
								Item List
							</h3>

							<div className='hidden sm:grid sm:grid-cols-[214px_46px_100px_74px_18px] sm:gap-4 mb-4'>
								<label className='text-xs text-[#7E88C3]'>Item Name</label>
								<label className='text-xs text-[#7E88C3]'>Qty.</label>
								<label className='text-xs text-[#7E88C3]'>Price</label>
								<label className='text-xs text-[#7E88C3]'>Total</label>
							</div>

							{fields.map((field, index) => (
								<div key={field.id} className='mb-12 sm:mb-6'>
									<div className='sm:grid sm:grid-cols-[214px_46px_100px_74px_18px] sm:gap-4 items-center'>
										<div className='mb-6 sm:mb-0'>
											<FormInputItem
												register={register}
												errors={errors}
												index={index}
												id='name'
												label='Item Name'
												className='w-full'
												validationRules={{ required: `can't be empty` }}
											/>
										</div>
										<div className='grid grid-cols-[2fr_2fr_2fr_0.5fr] gap-4 sm:gap-0 sm:contents items-center'>
											<FormInputItem
												register={register}
												errors={errors}
												index={index}
												id='quantity'
												label='Qty.'
												className='w-full text-center'
												isNumeric={true}
												validationRules={{ required: true }}
											/>
											<FormInputItem
												register={register}
												errors={errors}
												index={index}
												id='price'
												label='Price'
												className='w-full text-center'
												isNumeric={true}
												validationRules={{ required: true }}
											/>
											<div className='flex flex-col justify-between'>
												<label className='text-xs text-[#7E88C3] mb-2 sm:hidden h-4'>
													Total
												</label>
												<span
													id={`total-${index}`}
													className='text-xs text-[#888EB0] font-bold tracking-[-0.25px] w-full flex flex-col h-12 justify-center'>
													0.00
												</span>
											</div>
											<button
												type='button'
												onClick={() => remove(index)}
												className='md:ml-auto flex mt-4 sm:mt-0 sm: mb-1 items-center justify-center'>
												<img src={trash} alt='Delete' />
											</button>
										</div>
									</div>
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
		</div>,
		document.getElementById('portal-root')
	);
}
