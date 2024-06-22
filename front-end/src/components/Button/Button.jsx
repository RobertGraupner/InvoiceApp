// add color using tailwindcss classes
export function Button({ text, bgColor, hoverBgColor, textColor }) {
	return (
		<button
			className={`flex items-center justify-between ${bgColor} ${textColor} ${hoverBgColor} rounded-3xl text-xs font-bold tracking-[-0.25px] w-fit pt-[18px] pb-[15px] px-6`}>
			{text}
		</button>
	);
}
