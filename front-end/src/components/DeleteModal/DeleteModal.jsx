import { Button } from '../Button/Button';
import { createPortal } from 'react-dom';

export function DeleteModal({ isOpen, onClose, onConfirm, invoiceId }) {
	if (!isOpen) return null;

	return createPortal(
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-12 mx-6 max-w-[480px] w-full'>
				<h2 className='text-2xl font-bold tracking-[-0.5px] mb-3'>
					Confirm Deletion
				</h2>
				<p className='text-[#888EB0] mb-3 text-xs font-medium leading-[22px] tracking-[-0.1px]'>
					Are you sure you want to delete invoice #{invoiceId}? This action
					cannot be undone.
				</p>
				<div className='flex justify-end gap-2'>
					<Button
						bgColor='bg-[#F9FAFE]'
						hoverBgColor='hover:bg-[#DFE3FA]'
						textColor='text-[#7E88C3]'
						onClick={onClose}>
						Cancel
					</Button>
					<Button
						bgColor='bg-[#EC5757]'
						hoverBgColor='hover:bg-[#FF9797]'
						textColor='text-white'
						onClick={onConfirm}>
						Delete
					</Button>
				</div>
			</div>
		</div>,
		document.getElementById('portal-root')
	);
}
