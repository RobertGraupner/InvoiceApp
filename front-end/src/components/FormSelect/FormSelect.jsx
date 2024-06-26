import { useState, useRef, useEffect } from 'react';
import { useController } from 'react-hook-form';
import ArrowDown from '../../assets/icon-arrow-down.svg';

export function FormSelect({
	label,
	name,
	control,
	options,
	validationRules = {},
}) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const {
		field: { value, onChange },
		fieldState: { error },
	} = useController({
		name,
		control,
		rules: validationRules,
	});

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='flex flex-col relative w-full mb-6' ref={dropdownRef}>
			<label
				htmlFor={name}
				className={`text-xs tracking[-0.1px] leading-[15px] mb-2 ${
					error ? 'text-[#EC5757]' : 'text-[#7E88C3]'
				}`}>
				{label}
			</label>
			<div
				className={`relative cursor-pointer border rounded ${
					isOpen
						? 'border-[#9277FF]'
						: error
						? 'border-[#EC5757]'
						: 'border-[#DFE3FA]'
				}`}>
				<div
					className='rounded font-bold w-full text-[#0C0E16] text-xs leading-[14px] tracking-[-0.25px] px-5 pt-[17px] pb-[15px] flex justify-between items-center'
					onClick={() => setIsOpen(!isOpen)}>
					<span>{value || 'Net 1 day'}</span>
					<img
						src={ArrowDown}
						alt='Arrow down'
						className={`transform transition-transform ${
							isOpen ? 'rotate-180' : ''
						}`}
					/>
				</div>
				{isOpen && (
					<ul className='absolute top-full left-0 w-full bg-white border border-[#DFE3FA] rounded mt-6 shadow-lg z-10'>
						{options.map((option) => (
							<li
								key={option}
								className='px-5 py-3 hover:bg-[#F9FAFE] cursor-pointer text-xs font-bold text-[#0C0E16] border-b border-[#DFE3FA] last:border-b-0'
								onClick={() => {
									onChange(option);
									setIsOpen(false);
								}}>
								{option}
							</li>
						))}
					</ul>
				)}
			</div>
			{error && (
				<span className='absolute top-[75px] right-0 text-[#EC5757] text-[10px] me-1'>
					{error.message}
				</span>
			)}
		</div>
	);
}
