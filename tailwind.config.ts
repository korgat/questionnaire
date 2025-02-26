import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				muted: 'var(--muted)',
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				border: 'var(--border)',
				primary: 'var(--primary)',
				'light': 'var(--light)',
			},
		},
	},
	plugins: [],
} satisfies Config
