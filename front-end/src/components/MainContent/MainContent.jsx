export function MainContent({ children }) {
	return (
		<div className='mx-auto mt-8 flex w-full max-w-[1440px] min-h-[800px] h-full'>
			{children}
		</div>
	);
}
