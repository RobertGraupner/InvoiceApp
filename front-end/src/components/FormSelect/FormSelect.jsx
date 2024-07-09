import { useState, useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import ArrowDown from '../../assets/icon-arrow-down.svg';

const paymentTermsOptions = [
	{ value: 1, label: 'Net 1 Day' },
	{ value: 7, label: 'Net 7 Days' },
	{ value: 14, label: 'Net 14 Days' },
	{ value: 30, label: 'Net 30 Days' },
];

export function FormSelect({ label, name, control, validationRules = {} }) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className='flex flex-col relative w-full mb-6' ref={dropdownRef}>
			<Controller
				control={control}
				name={name}
				rules={validationRules}
				render={({
					field: { onChange, value, onBlur },
					fieldState: { error },
				}) => {
					const selectedOption =
						paymentTermsOptions.find((option) => option.value === value) || '';

					const handleOptionClick = (option) => {
						onChange(option.value);
						setIsOpen(false);
						onBlur();
					};

					return (
						<>
							<label
								htmlFor={name}
								className={`text-xs tracking[-0.1px] leading-[15px] mb-2 ${
									error
										? 'text-[#EC5757] dark:text-[#FF6B6B]'
										: 'text-[#7E88C3] dark:text-[#DFE3FA]'
								}`}>
								{label}
							</label>
							<div
								className={`relative h-12 cursor-pointer rounded border dark:bg-[#1E2139] ${
									isOpen
										? 'border-[#9277FF] dark:border-[#7C5DFA]'
										: error
										? 'border-[#EC5757] dark:border-[#FF6B6B]'
										: 'border-[#DFE3FA] dark:border-[#1E2139]'
								}`}
								onClick={() => setIsOpen(!isOpen)}>
								<div className='box-border flex h-12 w-full items-center justify-between border-0 px-5 pb-[15px] pt-[17px] text-xs font-bold leading-[14px] tracking-[-0.25px] text-[#0C0E16] dark:text-white'>
									<span>{selectedOption.label}</span>
									<img
										src={ArrowDown}
										alt='Arrow down'
										className={`transform transition-transform ${
											isOpen ? 'rotate-180' : ''
										}`}
									/>
								</div>
								{isOpen && (
									<ul className='absolute left-0 top-full z-10 mt-6 w-full rounded border border-[#DFE3FA] bg-white shadow-lg dark:border-transparent dark:bg-[#252945]'>
										{paymentTermsOptions.map((option) => (
											<li
												key={option.value}
												className='cursor-pointer border-b border-[#DFE3FA] px-5 py-3 text-xs font-bold text-[#0C0E16] last:border-b-0 hover:bg-[#F9FAFE] dark:border-[#1E2139] dark:text-white dark:hover:bg-transparent dark:hover:text-[#9277FF]'
												onClick={() => handleOptionClick(option)}>
												{option.label}
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
						</>
					);
				}}
			/>
		</div>
	);
}
