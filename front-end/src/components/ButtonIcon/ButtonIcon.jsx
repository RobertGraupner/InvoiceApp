import plusIcon from '../../assets/icon-plus.svg';

// add color using tailwindcss classes
export function ButtonIcon({
	text,
	mobileText,
	bgColor,
	hoverBgColor,
	textColor,
	onAddInvoice,
}) {
	return (
		<button
			className={`flex items-center justify-between p-2 ${bgColor} ${textColor} ${hoverBgColor} rounded-3xl text-xs font-bold leading-4 tracking-[-0.25px] w-fit gap-4 pr-4`}
			onClick={onAddInvoice}>
			<div className='bg-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0'>
				<img src={plusIcon} alt='Plus icon' />
			</div>
			<span className='hidden sm:inline'>{text}</span>
			<span className='inline sm:hidden'>{mobileText}</span>
		</button>
	);
}
