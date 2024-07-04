import { useDarkMode } from '../../hooks/useDarkMode';
import moon from '../../assets/icon-moon.svg';
import sun from '../../assets/icon-sun.svg';

export function DarkModeToggle() {
	const [isDarkMode, toggleDarkMode] = useDarkMode();

	return (
		<div className='flex w-full items-center justify-end md:h-[100px] md:justify-center'>
			<button onClick={toggleDarkMode}>
				<img
					src={isDarkMode ? sun : moon}
					alt={isDarkMode ? 'Light mode' : 'Dark mode'}
				/>
			</button>
		</div>
	);
}
