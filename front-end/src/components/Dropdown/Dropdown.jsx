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
				className='text-xs leading-4 tracking-[-0.25px] font-bold'>
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
				<ul className='absolute top-10 left-1/2 transform -translate-x-1/2 bg-white shadow-lg w-48 px-6 py-4 rounded-lg flex flex-col'>
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
