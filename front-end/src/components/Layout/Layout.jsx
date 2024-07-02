import { Outlet } from 'react-router-dom';
import { Container } from '../Container/Container';
import { MainContent } from '../MainContent/MainContent';
import { Sidebar } from '../Sidebar/Sidebar';

export function Layout() {
	return (
		<MainContent>
			<Sidebar />
			<div className='mx-14 flex-1 md:mx-5'>
				<Container>
					<Outlet />
				</Container>
			</div>
		</MainContent>
	);
}
