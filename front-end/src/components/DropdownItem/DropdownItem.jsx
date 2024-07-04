export function DropdownItem({ filter, handleSelect, selectedFilters }) {
	return (
		<li className='flex items-center gap-2 py-2 text-xs font-bold leading-4 tracking-[-0.25px]'>
			<input
				type='checkbox'
				// checked = true if filter is in selectedFilters
				checked={selectedFilters.includes(filter)}
				onChange={() => handleSelect(filter)}
				className='form-checkbox rounded-sm border-transparent bg-[#dfe3fa] text-[#7c5dfa] hover:border-[#7c5dfa] focus:ring-transparent'
				id={filter.toLowerCase()}
			/>
			<label
				htmlFor={filter.toLowerCase()}
				className='cursor-pointer dark:text-white'>
				{filter}
			</label>
		</li>
	);
}
