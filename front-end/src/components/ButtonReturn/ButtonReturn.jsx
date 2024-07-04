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
			<span className='mt-1 text-xs font-bold tracking-[-0.25px] hover:text-[#7E88C3] dark:text-[#888EB0]'>
				Go back
			</span>
		</button>
	);
}
