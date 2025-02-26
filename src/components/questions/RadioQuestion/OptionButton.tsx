import { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
import Image from 'next/image'

interface OptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isActive: boolean
	label: string
	iconSrc?: string
}

const OptionButton = (props: OptionButtonProps) => {
	const { className = '', isActive, label, iconSrc, ...rest } = props

	return (
		<button
			{...rest}
			className={cn(
				'w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl border-border border-2 bg-muted hover:border-gray-200 hover:bg-purple-100 transition-colors shadow-md',
				{
					'border-border bg-purple-200': isActive,
				},
				[className]
			)}
		>
			{!!iconSrc && (
				<Image
					width={30}
					height={30}
					alt={label}
					src={`/icons/${iconSrc}.png`}
					className='w-5 h-5 object-contain'
				/>
			)}
			<span className='text-gray-900 text-xs md:text-sm'>{label}</span>
		</button>
	)
}

export default OptionButton
