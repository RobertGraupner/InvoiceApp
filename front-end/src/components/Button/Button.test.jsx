import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
	it('applies custom classes correctly and render correct text', () => {
		render(
			<Button
				bgColor='justify-center'
				textColor='items-center'
				hoverBgColor='rounded-3xl'
				className='font-bold'>
				Test
			</Button>
		);
		const button = screen.getByText('Test');
		expect(button).toHaveClass(
			'justify-center',
			'items-center',
			'rounded-3xl',
			'font-bold'
		);
	});

	it('calls onClick handler when clicked', async () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Test</Button>);
		fireEvent.click(screen.getByText('Test'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
