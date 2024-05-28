import avatar from '../../assets/image-avatar.jpg';

export function Avatar() {
	return (
		<div className='flex items-center justify-center w-full h-[90px] border-t border-[#494E6E]'>
			<img src={avatar} alt='Avatar' className='h-10 w-10 rounded-full' />
		</div>
	);
}
