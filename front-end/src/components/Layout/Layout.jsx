import { Avatar } from '../Avatar/Avatar';
import { DarkModeToggle } from '../DarkModeToggle/DarkModeToggle';
import { Logo } from '../Logo/Logo';
import { MainContent } from '../MainContent/MainContent';
import { Sidebar } from '../Sidebar/Sidebar';

export function Layout({ children }) {
	return (
		<MainContent>
			<Sidebar>
				<Logo />
				<div>
					<DarkModeToggle />
					<Avatar />
				</div>
			</Sidebar>
			<div className='flex-1'>{children}</div>
		</MainContent>
	);
}
