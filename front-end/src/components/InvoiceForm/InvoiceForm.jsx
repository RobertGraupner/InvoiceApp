import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '../Button/Button';
import { FormInput } from '../FormInput/FormInput';
import { FormInputItem } from '../FormInputItem/FormInputItem';
import { FormSelect } from '../FormSelect/FormSelect';
import { FormDatePicker } from '../FormDatePicker/FormDatePicker';
import { FormButtons } from '../FormButtons/FormButtons';
import { FormAddress } from '../FormAddress/FormAddress';
import { useInvoiceMutations } from '../../hooks/useInvoiceMutations';
import { formatInvoiceData } from '../../utils/formatInvoiceData';
import { createPortal } from 'react-dom';
import trash from '../../assets/icon-delete.svg';

export function InvoiceForm({
	isVisible,
	onClose,
	initialData = {},
	mode = 'create',
}) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		getValues,
	} = useForm({
		defaultValues:
			mode === 'edit'
				? {
						id: initialData.id,
						invoiceDate: new Date(initialData.createdAt),
						paymentTerms: initialData.paymentTerms,
						projectDescription: initialData.description,
						clientName: initialData.clientName,
						clientEmail: initialData.clientEmail,
						status: initialData.status,
						streetAddress: initialData.senderAddress?.street,
						city: initialData.senderAddress?.city,
						postCode: initialData.senderAddress?.postCode,
						country: initialData.senderAddress?.country,
						clientStreetAddress: initialData.clientAddress?.street,
						clientCity: initialData.clientAddress?.city,
						clientPostCode: initialData.clientAddress?.postCode,
						clientCountry: initialData.clientAddress?.country,
						items: initialData.items?.map((item) => ({
							name: item.name,
							quantity: item.quantity.toString(),
							price: item.price.toString(),
						})) || [{ name: '', quantity: '', price: '' }],
				  }
				: {
						items: [{ name: '', quantity: '', price: '' }],
				  },
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'items',
	});

	const { addInvoice, updateInvoice } = useInvoiceMutations();

	const handleAddNewItem = (e) => {
		e.preventDefault();
		append({ name: '', quantity: '', price: '' });
	};

	const onSubmit = (data) => {
		const formattedData = formatInvoiceData(data, mode, false);

		if (mode === 'create') {
			addInvoice.mutate(formattedData, {
				onSuccess: () => {
					reset();
					onClose();
				},
			});
		} else {
			updateInvoice.mutate(formattedData, {
				onSuccess: () => {
					reset();
					onClose();
				},
			});
		}
	};

	const handleSaveDraft = () => {
		const values = getValues();
		const formattedData = formatInvoiceData(values, mode, true);

		addInvoice.mutate(formattedData, {
			onSuccess: () => {
				reset();
				onClose();
			},
		});
	};

	if (!isVisible) return null;

	return createPortal(
		<div className='fixed inset-0 pt-20 md:pt-0 md:left-[103px] flex items-start z-50 bg-black bg-opacity-50'>
			<div className='w-[630px] p-6 sm:p-14 max-h-[calc(100vh-80px)] md:min-h-screen overflow-y-auto scrollbar-hide sm:rounded-tr-[20px] sm:rounded-br-[20px] bg-white dark:bg-[#141625] shadow-xl'>
				<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
					<h2 className='text-2xl font-bold tracking-[-0.5px] dark:text-white'>
						{mode === 'create' ? 'New Invoice' : 'Edit Invoice '}
						{mode !== 'create' && (
							<span className='text-[#888EB0]'>
								#
								<span className='dark:text-white text-[#0C0E16]'>
									{initialData.id}
								</span>
							</span>
						)}
					</h2>
					<div className='flex flex-col mt-11'>
						<h3 className='font-bold text-[#7C5DFA] tracking-[-0.25px] mb-6'>
							Bill from
						</h3>
						<FormAddress
							register={register}
							errors={errors}
							streetAddressId='streetAddress'
							cityId='city'
							postCodeId='postCode'
							countryId='country'
						/>
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
						<FormAddress
							register={register}
							errors={errors}
							streetAddressId='clientStreetAddress'
							cityId='clientCity'
							postCodeId='clientPostCode'
							countryId='clientCountry'
						/>
						<div className='flex flex-col sm:mt-11'>
							<div className='flex flex-col sm:gap-6'>
								<FormSelect
									label='Payment Terms'
									name='paymentTerms'
									control={control}
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
								<label className='text-xs text-[#7E88C3] dark:text-[#DFE3FA]'>
									Item Name
								</label>
								<label className='text-xs text-[#7E88C3] dark:text-[#DFE3FA]'>
									Qty.
								</label>
								<label className='text-xs text-[#7E88C3] dark:text-[#DFE3FA]'>
									Price
								</label>
								<label className='text-xs text-[#7E88C3] dark:text-[#DFE3FA]'>
									Total
								</label>
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
													className='text-xs text-[#888EB0] dark:text-[#DFE3FA] font-bold tracking-[-0.25px] w-full flex flex-col h-12 justify-center'>
													0.00
												</span>
											</div>
											<button
												type='button'
												onClick={() => remove(index)}
												className='md:ml-auto flex mt-4 sm:mt-0 sm:mb-1 items-center justify-center'>
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
								className='w-full dark:bg-[#252945] dark:text-[#DFE3FA]'>
								+ Add New Item
							</Button>
						</div>
					</div>
					<FormButtons
						mode={mode}
						onClose={onClose}
						onSaveDraft={handleSaveDraft}
						onSubmit={handleSubmit(onSubmit)}
					/>
				</form>
			</div>
		</div>,
		document.getElementById('portal-root')
	);
}
