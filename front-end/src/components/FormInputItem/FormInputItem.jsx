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
				className='mb-2 block text-xs text-[#7E88C3] dark:text-[#DFE3FA] sm:hidden'>
				{label}
			</label>
			<input
				id={fieldName}
				className={`w-full min-w-0 flex-1 rounded border border-solid pb-[15px] pt-[17px] text-xs font-bold leading-[14px] tracking-[-0.25px] text-[#0C0E16] focus:outline-none focus:ring-0 dark:bg-[#1E2139] dark:text-white ${className} ${
					errors.items?.[index]?.[id]
						? 'border-[#EC5757] focus:border-[#EC5757] dark:border-[#FF6B6B] dark:focus:border-[#FF6B6B]'
						: 'border-[#DFE3FA] focus:border-[#9277FF] dark:border-[#1E2139] dark:focus:border-[#7C5DFA]'
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
				<span className='absolute right-0 top-[52px] me-1 text-[10px] text-[#EC5757] dark:text-[#EC5757]'>
					{errors.items[index][id].message}
				</span>
			)}
		</div>
	);
}
