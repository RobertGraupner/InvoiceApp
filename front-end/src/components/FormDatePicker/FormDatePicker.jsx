import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/datepicker.css';
import calendarIcon from '../../assets/icon-calendar.svg';

export function FormDatePicker({ control, name, label, validationRules = {} }) {
	return (
		<div className='flex flex-col relative w-full mb-6'>
			<Controller
				control={control}
				name={name}
				rules={validationRules}
				render={({
					field: { onChange, value, onBlur },
					fieldState: { error },
				}) => (
					<>
						<label
							htmlFor={name}
							className={`text-xs tracking[-0.1px] leading-[15px] mb-2 ${
								error ? 'text-[#EC5757]' : 'text-[#7E88C3]'
							}`}>
							{label}
						</label>

						<DatePicker
							selected={value}
							onChange={onChange}
							dateFormat='dd MMM yyyy'
							className={`border border-solid focus:ring-0 focus:outline-none flex-1 min-w-0 rounded font-bold w-full text-[#0C0E16] text-xs leading-[14px] tracking-[-0.25px] px-5 pt-[17px] pb-[15px] ${
								error
									? 'border-[#EC5757] focus:border-[#EC5757]'
									: 'border-[#DFE3FA] focus:border-[#9277FF]'
							}`}
							onBlur={onBlur}
						/>
						<img
							src={calendarIcon}
							alt='Calendar'
							className='absolute right-4 pointer-events-none top-[55%]'
						/>
						{error && (
							<span className='text-[#EC5757] absolute top-[75px] right-0 text-[10px] me-1'>
								{error.message}
							</span>
						)}
					</>
				)}
			/>
		</div>
	);
}
