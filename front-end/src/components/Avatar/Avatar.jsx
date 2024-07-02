import avatar from '../../assets/image-avatar.jpg';

export function Avatar() {
	return (
		<div className='ml-8 flex h-20 w-24 shrink-0 items-center justify-center border-l border-[#494E6E] md:ml-0 md:h-[90px] md:w-full md:border-t'>
			<img
				src={avatar}
				alt='Avatar'
				className='h-8 w-8 rounded-full md:h-10 md:w-10'
			/>
		</div>
	);
}
