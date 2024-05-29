import ArrowDown from '../../assets/icon-arrow-down.svg';
import { useState, useEffect, useRef } from 'react';
import { DropdownItem } from '../DropdownItem/DropdownItem';

export function Dropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (filter) => {
		if (selectedFilters.includes(filter)) {
			// remove filter if it's already selected
			setSelectedFilters(selectedFilters.filter((f) => f !== filter));
		} else {
			setSelectedFilters([...selectedFilters, filter]);
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
				Filter by status
				<img
					src={ArrowDown}
					alt='Arrow down icon'
					className='inline-block ml-4'
				/>
			</button>
			{isOpen && (
				<ul className='absolute top-10 left-0 bg-white shadow-lg w-48 p-6 rounded-lg flex flex-col'>
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