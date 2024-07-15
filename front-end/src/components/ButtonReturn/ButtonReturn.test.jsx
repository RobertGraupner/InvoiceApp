import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonReturn } from './ButtonReturn';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

describe('ButtonReturn', () => {
	it('renders correctly', () => {
		render(
			<MemoryRouter>
				<ButtonReturn />
			</MemoryRouter>
		);
		expect(screen.getByText('Go back')).toBeDefined();
	});

	it('navigates to home page when clicked', () => {
		render(
			<MemoryRouter>
				<ButtonReturn />
			</MemoryRouter>
		);
		fireEvent.click(screen.getByText('Go back'));
		expect(mockNavigate).toHaveBeenCalledWith('/');
	});
});
