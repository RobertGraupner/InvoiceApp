import { Outlet } from 'react-router-dom';
import { Avatar } from '../Avatar/Avatar';
import { Container } from '../Container/Container';
import { DarkModeToggle } from '../DarkModeToggle/DarkModeToggle';
import { Logo } from '../Logo/Logo';
import { MainContent } from '../MainContent/MainContent';
import { Sidebar } from '../Sidebar/Sidebar';

export function Layout() {
	return (
		<MainContent>
			<Sidebar>
				<Logo />
				<div>
					<DarkModeToggle />
					<Avatar />
				</div>
			</Sidebar>
			<div className='flex-1'>
				<Container>
					<Outlet />
				</Container>
			</div>
		</MainContent>
	);
}
