import { FormInput } from '../FormInput/FormInput';

export function FormAddress({
	register,
	errors,
	streetAddressId,
	cityId,
	postCodeId,
	countryId,
}) {
	return (
		<>
			<FormInput
				label='Street Address'
				id={streetAddressId}
				register={register}
				errors={errors}
				validationRules={{
					required: `can't be empty`,
				}}
			/>
			<div className='flex flex-col sm:flex-row sm:gap-6'>
				<div className='flex gap-6'>
					<FormInput
						label='City'
						id={cityId}
						register={register}
						errors={errors}
						validationRules={{
							required: `can't be empty`,
						}}
					/>
					<FormInput
						label='Post Code'
						id={postCodeId}
						register={register}
						errors={errors}
						validationRules={{
							required: `can't be empty`,
						}}
					/>
				</div>
				<FormInput
					label='Country'
					id={countryId}
					register={register}
					errors={errors}
					validationRules={{
						required: `can't be empty`,
					}}
				/>
			</div>
		</>
	);
}
