import logo from '../../assets/logo.svg';

export function Logo() {
	return (
		<div className='relative flex items-center justify-center h-[103px] w-full rounded-r-3xl bg-[#7c5dfa] overflow-hidden'>
			<div className='absolute h-1/2 w-full bg-[#9277ff] bottom-0 rounded-tl-3xl'></div>
			<img className='w-[40px] z-10' src={logo} alt='Logo' />
		</div>
	);
}
