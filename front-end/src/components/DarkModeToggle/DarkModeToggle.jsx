import moon from '../../assets/icon-moon.svg';

export function DarkModeToggle() {
	return (
		<div className='flex w-full items-center justify-end md:h-[100px] md:justify-center'>
			<button>
				<img src={moon} alt='Moon' />
			</button>
		</div>
	);
}
