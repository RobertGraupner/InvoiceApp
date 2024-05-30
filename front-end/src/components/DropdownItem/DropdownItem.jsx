export function DropdownItem({ filter, handleSelect, selectedFilters }) {
	return (
		<li className='flex py-2 items-center gap-2 text-xs leading-4 tracking-[-0.25px] font-bold'>
			<input
				type='checkbox'
				// checked = true if filter is in selectedFilters
				checked={selectedFilters.includes(filter)}
				onChange={() => handleSelect(filter)}
				className='form-checkbox bg-[#dfe3fa] text-[#7c5dfa] border-transparent focus:ring-transparent hover:border-[#7c5dfa]'
				id={filter.toLowerCase()}
			/>
			<label htmlFor={filter.toLowerCase()} className='cursor-pointer'>
				{filter}
			</label>
		</li>
	);
}
