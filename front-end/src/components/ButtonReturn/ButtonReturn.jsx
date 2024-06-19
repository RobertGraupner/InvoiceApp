import { useNavigate } from 'react-router-dom';
import ArrowLeft from '../../assets/icon-arrow-left.svg';

export function ButtonReturn() {
	const navigate = useNavigate();

	return (
		<button
			className='inline-flex items-center gap-6'
			onClick={() => {
				navigate('/');
			}}>
			<img src={ArrowLeft} alt='Arrow left icon' />
			<span className='text-xs ledading-4 tracking-[-0.25px] font-bold mt-1'>
				Go back
			</span>
		</button>
	);
}
