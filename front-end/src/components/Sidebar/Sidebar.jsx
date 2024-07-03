import { Logo } from '../Logo/Logo';
import { DarkModeToggle } from '../DarkModeToggle/DarkModeToggle';
import { Avatar } from '../Avatar/Avatar';

export function Sidebar() {
	return (
		<div className='sticky top-0 flex h-20 items-center justify-between bg-[#373B53] p-0 md:min-h-screen md:w-[103px] md:flex-col md:rounded-r-3xl'>
			<Logo />
			<div className='flex w-full items-center md:flex-col'>
				<DarkModeToggle />
				<Avatar />
			</div>
		</div>
	);
}
