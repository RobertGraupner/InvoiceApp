import { FormInput } from '../FormInput/FormInput';
import { FormAddress } from '../FormAddress/FormAddress';
import { FormSelect } from '../FormSelect/FormSelect';
import { FormDatePicker } from '../FormDatePicker/FormDatePicker';

export function FormBillToSection({ register, errors, control }) {
	return (
		<div className='flex flex-col mt-4 ms:mt-11'>
			<h3 className='font-bold text-[#7C5DFA] tracking-[-0.25px] mb-6'>
				Bill to
			</h3>
			<FormInput
				label='Client’s Name'
				id='clientName'
				register={register}
				errors={errors}
				validationRules={{
					required: `can't be empty`,
				}}
			/>
			<FormInput
				label='Client’s Email'
				id='clientEmail'
				register={register}
				errors={errors}
				validationRules={{
					required: `can't be empty`,
				}}
			/>
			<FormAddress
				register={register}
				errors={errors}
				streetAddressId='clientStreetAddress'
				cityId='clientCity'
				postCodeId='clientPostCode'
				countryId='clientCountry'
			/>
			<div className='flex flex-col sm:mt-11'>
				<div className='flex flex-col sm:gap-6'>
					<FormSelect
						label='Payment Terms'
						name='paymentTerms'
						control={control}
						validationRules={{
							required: `can't be empty`,
						}}
					/>
					<FormDatePicker
						control={control}
						name='invoiceDate'
						label='Invoice Date'
						validationRules={{
							required: `can't be empty`,
						}}
					/>
				</div>
				<FormInput
					label='Project Description'
					id='projectDescription'
					register={register}
					errors={errors}
					validationRules={{
						required: `can't be empty`,
					}}
				/>
			</div>
		</div>
	);
}
