export function StatusBadge({ status }) {
	const statusColors = {
		Paid: {
			bg: 'bg-paid-color',
			text: 'text-paid-text',
			dot: 'bg-paid-text',
		},
		Pending: {
			bg: 'bg-pending-color',
			text: 'text-pending-text',
			dot: 'bg-pending-text',
		},
		Draft: {
			bg: 'bg-draft-color',
			text: 'text-draft-text',
			dot: 'bg-draft-text',
		},
	};

	const {
		bg: statusColorBg,
		text: statusColorText,
		dot: statusColorDot,
	} = statusColors[status];

	return (
		<div
			className={`flex items-center justify-center h-10 w-[104px] gap-2 rounded-md mr-0 sm:mr-5 ${statusColorBg}`}>
			<div className={`h-2 w-2 rounded-full ${statusColorDot}`}></div>
			<span className={`text-xs font-bold ${statusColorText}`}>{status}</span>
		</div>
	);
}
