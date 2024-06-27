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
			className={`flex items-center justify-center ${bgColor} ${textColor} ${hoverBgColor} ${className} rounded-3xl text-xs font-bold tracking-[-0.25px] w-fit pt-[18px] pb-[15px] px-6`}
			onClick={onClick}>
			{children}
		</button>
	);
}
