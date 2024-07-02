export function MainContent({ children }) {
	return (
		<div className='flex min-h-screen w-full flex-col bg-[#f8f8fb] md:flex-row'>
			{children}
		</div>
	);
}
