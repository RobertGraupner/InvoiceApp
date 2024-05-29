// add color using tailwindcss classes
export function Button({ text, bgColor, hoverBgColor, textColor }) {
	return (
		<button
			className={`flex items-center justify-between ${bgColor} ${textColor} ${hoverBgColor} rounded-3xl text-xs font-bold leading-4 tracking-[-0.25px] w-fit py-4 px-6`}>
			{text}
		</button>
	);
}
