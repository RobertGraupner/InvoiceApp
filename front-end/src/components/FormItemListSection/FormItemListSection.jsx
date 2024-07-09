import { Button } from '../Button/Button';
import { FormInputItem } from '../FormInputItem/FormInputItem';
import trash from '../../assets/icon-delete.svg';

export function FormItemListSection({
	fields,
	register,
	errors,
	control,
	remove,
	totals,
	handleTotalChange,
	handleAddNewItem,
}) {
	return (
		<div className='mt-10'>
			<h3 className='font-bold text-lg text-[#777F98] mb-6'>Item List</h3>
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
								control={control}
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
								control={control}
								index={index}
								onTotalChange
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
								control={control}
								onTotalChange={handleTotalChange}
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
									{totals[index]}
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
	);
}
