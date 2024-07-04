import ArrowDown from '../../assets/icon-arrow-down.svg';
import { useState, useEffect, useRef } from 'react';
import { DropdownItem } from '../DropdownItem/DropdownItem';

export function Dropdown({ selectedFilters, updateFilters }) {
	const [isOpen, setIsOpen] = useState(false);

	const dropdownRef = useRef(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (filter) => {
		if (selectedFilters.includes(filter)) {
			// remove filter if it's already selected
			updateFilters(selectedFilters.filter((f) => f !== filter));
		} else {
			updateFilters([...selectedFilters, filter]);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		// cleanup event listener
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				onClick={toggleDropdown}
				className='text-xs font-bold leading-4 tracking-[-0.25px] dark:text-white'>
				<span className='hidden sm:inline'>Filter by status</span>
				<span className='inline sm:hidden'>Filter</span>
				<img
					src={ArrowDown}
					alt='Arrow down icon'
					className={`inline-block ml-4 transform ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>
			{isOpen && (
				<ul className='absolute left-1/2 top-10 flex w-48 -translate-x-1/2 transform flex-col rounded-lg bg-white px-6 py-4 shadow-lg dark:bg-[#1E2139]'>
					<DropdownItem
						filter='Draft'
						handleSelect={handleSelect}
						selectedFilters={selectedFilters}
					/>
					<DropdownItem
						filter='Pending'
						handleSelect={handleSelect}
						selectedFilters={selectedFilters}
					/>
					<DropdownItem
						filter='Paid'
						handleSelect={handleSelect}
						selectedFilters={selectedFilters}
					/>
				</ul>
			)}
		</div>
	);
}
