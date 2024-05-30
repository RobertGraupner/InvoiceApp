/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'draft-color': 'rgba(55, 59, 83, 0.06)',
				'draft-text': '#373B53',
				'pending-color': 'rgba(255, 143, 0, 0.06)',
				'pending-text': '#FF8F00',
				'paid-color': 'rgba(51, 214, 159, 0.06)',
				'paid-text': '#33D69F',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
