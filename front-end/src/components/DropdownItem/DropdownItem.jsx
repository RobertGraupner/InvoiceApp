export function DropdownItem({ filter, handleSelect, selectedFilters }) {
	return (
		<li className='flex p-2 items-center gap-2 cursor-pointer text-xs leading-4 tracking-[-0.25px] font-bold'>
			<input
				type='checkbox'
				// checked = true if filter is in selectedFilters
				checked={selectedFilters.includes(filter)}
				onChange={() => handleSelect(filter)}
				className='mr-2 cursor-pointer accent-[#dfe3fa] hover:accent-[#7c5dfa] focus:accent-[#7c5dfa]'
				id={filter.toLowerCase()}
			/>
			<label htmlFor={filter.toLowerCase()} className='cursor-pointer'>
				{filter}
			</label>
		</li>
	);
}
