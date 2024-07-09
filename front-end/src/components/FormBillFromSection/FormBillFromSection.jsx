import { FormAddress } from '../FormAddress/FormAddress';

export function FormBillFromSection({ register, errors }) {
	return (
		<div className='flex flex-col mt-11'>
			<h3 className='font-bold text-[#7C5DFA] tracking-[-0.25px] mb-6'>
				Bill from
			</h3>
			<FormAddress
				register={register}
				errors={errors}
				streetAddressId='streetAddress'
				cityId='city'
				postCodeId='postCode'
				countryId='country'
			/>
		</div>
	);
}
