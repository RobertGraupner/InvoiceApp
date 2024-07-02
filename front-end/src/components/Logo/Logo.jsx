import logo from '../../assets/logo.svg';

export function Logo() {
	return (
		<div className='relative flex h-full w-20 shrink-0 items-center justify-center overflow-hidden md:rounded-r-3xl rounded-r-[20px] bg-[#7c5dfa] md:h-[103px] md:w-full'>
			<div className='absolute bottom-0 h-1/2 w-full rounded-tl-3xl bg-[#9277ff]'></div>
			<img className='z-10 w-8 md:w-10' src={logo} alt='Logo' />
		</div>
	);
}
