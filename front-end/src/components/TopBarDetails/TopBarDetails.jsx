import { StatusBadge } from '../StatusBadge/StatusBadge';

export function TopBarDetails({ children }) {
	return (
		<div className='flex items-center justify-between rounded-lg p-4 bg-white w-full cursor-pointer leading-4 tracking-[-0.25px] border border-transparent hover:border-[#7c5dfa]'>
			{children}
		</div>
	);
}
