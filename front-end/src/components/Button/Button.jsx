// add color using tailwindcss classes
export function Button({
	children,
	bgColor,
	hoverBgColor,
	textColor,
	onClick,
}) {
	return (
		<button
			className={`flex items-center justify-between ${bgColor} ${textColor} ${hoverBgColor} rounded-3xl text-xs font-bold tracking-[-0.25px] w-fit pt-[18px] pb-[15px] px-6`}
			onClick={onClick}>
			{children}
		</button>
	);
}
