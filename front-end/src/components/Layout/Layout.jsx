import { Avatar } from '../Avatar/Avatar';
import { Container } from '../Container/Container';
import { DarkModeToggle } from '../DarkModeToggle/DarkModeToggle';
import { InvoicesList } from '../InvoicesList/InvoicesList';
import { Logo } from '../Logo/Logo';
import { MainContent } from '../MainContent/MainContent';
import { Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar/TopBar';

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
			<div className='flex-1'>
				<Container>
					<TopBar />
					<InvoicesList />
				</Container>
			</div>
		</MainContent>
	);
}
