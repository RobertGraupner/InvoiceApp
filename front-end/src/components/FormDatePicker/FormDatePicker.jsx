import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/datepicker.css';

export function FormDatePicker({
	control,
	id,
	label,
	errors,
	validationRules = {},
}) {
	return (
		<div className='flex flex-col relative w-full mb-6'>
			<label
				htmlFor={id}
				className={`text-xs tracking[-0.1px] leading-[15px] mb-2 ${
					errors[id] ? 'text-[#EC5757]' : 'text-[#7E88C3]'
				}`}>
				{label}
			</label>
			<Controller
				control={control}
				rules={validationRules}
				name={id}
				render={({ field: { onChange, value } }) => (
					<DatePicker
						selected={value}
						onChange={onChange}
						dateFormat='dd MMM yyyy'
						className={`border border-solid focus:ring-0 focus:outline-none flex-1 min-w-0 rounded font-bold w-full text-[#0C0E16] text-xs leading-[14px] tracking-[-0.25px] px-5 pt-[17px] pb-[15px] ${
							errors[id]
								? 'border-[#EC5757] focus:border-[#EC5757]'
								: 'border-[#DFE3FA] focus:border-[#9277FF]'
						} focus:ring-0 focus:outline-none`}
					/>
				)}
			/>
			{errors[id] && (
				<span className='absolute top-[75px] right-0 text-[#EC5757] text-[10px] me-1'>
					{errors[id].message}
				</span>
			)}
		</div>
	);
}