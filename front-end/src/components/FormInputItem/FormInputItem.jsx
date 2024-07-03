import { calculateTotalPrice } from '../../utils/calculateTotalPrice';
import { formatAmount } from '../../utils/formatAmount';

export function FormInputItem({
	register,
	errors,
	index,
	label,
	id,
	className = '',
	validationRules = {},
	isNumeric = false,
	...rest
}) {
	const fieldName = `items.${index}.${id}`;

	const calculateAndUpdateTotal = () => {
		const quantityInput = document.querySelector(
			`input[name="items.${index}.quantity"]`
		);
		const priceInput = document.querySelector(
			`input[name="items.${index}.price"]`
		);
		const totalSpan = document.querySelector(`#total-${index}`);

		if (quantityInput && priceInput && totalSpan) {
			const total = calculateTotalPrice(quantityInput.value, priceInput.value);
			totalSpan.textContent = formatAmount(total);
		}
	};

	return (
		<div className='flex flex-col relative'>
			<label
				htmlFor={fieldName}
				className='sm:hidden text-xs text-[#7E88C3] mb-2 block'>
				{label}
			</label>
			<input
				id={fieldName}
				className={`border border-solid focus:ring-0 focus:outline-none flex-1 min-w-0 rounded font-bold w-full text-[#0C0E16] text-xs leading-[14px] tracking-[-0.25px] pt-[17px] pb-[15px] ${className} ${
					errors.items?.[index]?.[id]
						? 'border-[#EC5757] focus:border-[#EC5757]'
						: 'border-[#DFE3FA] focus:border-[#9277FF]'
				} focus:ring-0 focus:outline-none`}
				{...register(fieldName, validationRules)}
				{...rest}
				onChange={(e) => {
					if (isNumeric) {
						const newValue = e.target.value.replace(/[^0-9.]/g, '');
						e.target.value = newValue;
					}
					calculateAndUpdateTotal();
				}}
			/>
			{errors.items?.[index]?.[id] && (
				<span className='absolute top-[52px] right-0 text-[#EC5757] text-[10px] me-1'>
					{errors.items[index][id].message}
				</span>
			)}
		</div>
	);
}
