// add color using tailwindcss classes
export function Button({
	children,
	bgColor,
	hoverBgColor,
	textColor,
	onClick,
	className = '',
}) {
	return (
		<button
			className={`${bgColor} ${textColor} ${hoverBgColor} ${className} flex w-fit items-center justify-center rounded-3xl pb-[15px] pt-[18px] text-xs font-bold tracking-[-0.25px]`}
			onClick={onClick}>
			{children}
		</button>
	);
}
