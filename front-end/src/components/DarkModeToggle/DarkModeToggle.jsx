import moon from '../../assets/icon-moon.svg';

export function DarkModeToggle() {
	return (
		<div className='flex items-center justify-center w-full h-[100px]'>
			<button>
				<img src={moon} alt='Moon' />
			</button>
		</div>
	);
}
