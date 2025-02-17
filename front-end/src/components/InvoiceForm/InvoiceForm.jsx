import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { FormButtons } from '../FormButtons/FormButtons';
import { useInvoiceMutations } from '../../hooks/useInvoiceMutations';
import { formatInvoiceData } from '../../utils/formatInvoiceData';
import { getDefaultInvoiceValues } from '../../utils/getDefaultInvoiceValues';
import { createPortal } from 'react-dom';
import { FormItemListSection } from '../FormItemListSection/FormItemListSection';
import { FormBillFromSection } from '../FormBillFromSection/FormBillFromSection';
import { FormBillToSection } from '../FormBillToSection/FormBillToSection';

export function InvoiceForm({
	isVisible,
	onClose,
	initialData = {},
	mode = 'create',
	invoice,
}) {
	const defaultValues = {
		...getDefaultInvoiceValues(mode, initialData),
		invoiceDate: invoice?.created_at
			? new Date(invoice.created_at)
			: new Date(),
		paymentDue: invoice?.payment_due
			? new Date(invoice.payment_due)
			: new Date(),
	};

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		getValues,
	} = useForm({
		defaultValues,
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'items',
	});

	const [totals, setTotals] = useState({});
	const { addInvoice, updateInvoice } = useInvoiceMutations();

	// handlers
	const handleTotalChange = (index, total) => {
		setTotals((prev) => ({ ...prev, [index]: total }));
	};

	const handleAddNewItem = (e) => {
		e.preventDefault();
		append({ name: '', quantity: '', price: '' });
	};

	const onSubmit = (data) => {
		const formattedData = formatInvoiceData(data, mode, false);
		const mutation = mode === 'create' ? addInvoice : updateInvoice;

		mutation.mutate(formattedData, {
			onSuccess: () => {
				reset();
				onClose();
			},
		});
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
					{/* Header */}
					<h2 className='text-2xl font-bold tracking-[-0.5px] dark:text-white'>
						{mode === 'create' ? 'New Invoice' : 'Edit Invoice '}
						{mode !== 'create' && (
							<span className='text-[#888EB0]'>
								#
								<span className='dark:text-white text-[#0C0E16]'>
									{initialData.invoice_number}
								</span>
							</span>
						)}
					</h2>
					{/* Bill from section */}
					<FormBillFromSection register={register} errors={errors} />
					{/* Bill to section */}
					<FormBillToSection
						register={register}
						errors={errors}
						control={control}
					/>
					{/* Item list section */}
					<FormItemListSection
						fields={fields}
						register={register}
						errors={errors}
						control={control}
						totals={totals}
						handleTotalChange={handleTotalChange}
						remove={remove}
						handleAddNewItem={handleAddNewItem}
					/>
					{/* Form buttons */}
					<FormButtons
						mode={mode}
						onClose={onClose}
						onSaveDraft={handleSaveDraft}
						onSubmit={handleSubmit(onSubmit)}
						reset={reset}
					/>
				</form>
			</div>
		</div>,
		document.getElementById('portal-root')
	);
}
