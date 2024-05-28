export function Sidebar({ children }) {
	return (
		<div className='flex flex-col justify-between w-[103px] bg-[#373B53] rounded-r-3xl overflow-hidden '>
			{children}
		</div>
	);
}
