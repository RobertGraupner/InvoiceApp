import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from './useDarkMode';

describe('useDarkMode', () => {
	// This afterEach hook will run after each test in this describe block
	afterEach(() => {
		document.documentElement.classList.remove('dark');
	});

	it('should initialize with dark mode off', () => {
		const { result } = renderHook(() => useDarkMode());
		expect(result.current[0]).toBe(false);
	});

	it('should toggle dark mode', () => {
		const { result } = renderHook(() => useDarkMode());
		act(() => {
			result.current[1]();
		});
		expect(result.current[0]).toBe(true);
	});

	it('should add dark class to document.documentElement when dark mode is on', () => {
		const { result } = renderHook(() => useDarkMode());
		act(() => {
			result.current[1]();
		});
		expect(document.documentElement.classList.contains('dark')).toBe(true);
	});

	it('should remove dark class from document.documentElement when dark mode is off', () => {
		const { result } = renderHook(() => useDarkMode());
		act(() => {
			result.current[1](); // Turn on
			result.current[1](); // Turn off
		});
		expect(document.documentElement.classList.contains('dark')).toBe(false);
	});
});
