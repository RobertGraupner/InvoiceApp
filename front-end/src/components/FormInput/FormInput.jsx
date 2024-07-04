export function FormInput({
	label,
	id,
	register,
	errors,
	validationRules = {},
	...rest
}) {
	return (
		<div className='flex flex-col relative mb-6'>
			<label
				htmlFor={id}
				className={`text-xs tracking[-0.1px] leading-[15px] mb-2 ${
					errors[id]
						? 'text-[#EC5757] dark:text-[#FF6B6B'
						: 'text-[#7E88C3] dark:text-[#DFE3FA]'
				}`}>
				{label}
			</label>
			<input
				id={id}
				className={`w-full min-w-0 flex-1 rounded border border-solid px-5 pb-[15px] pt-[17px] text-xs font-bold leading-[14px] tracking-[-0.25px] text-[#0C0E16] focus:outline-none focus:ring-0 dark:bg-[#1E2139] dark:text-white ${
					errors[id]
						? 'border-[#EC5757] focus:border-[#EC5757] dark:border-[#FF6B6B] dark:focus:border-[#FF6B6B]'
						: 'border-[#DFE3FA] focus:border-[#9277FF] dark:border-[#1E2139] dark:focus:border-[#7C5DFA]'
				} focus:ring-0 focus:outline-none`}
				{...register(id, { ...validationRules })}
				{...rest}
			/>
			{errors[id] && (
				<span className='absolute top-[75px] right-0 text-[#EC5757] dark:text-[#FF6B6B] text-[10px] me-1'>
					{errors[id].message}
				</span>
			)}
		</div>
	);
}
