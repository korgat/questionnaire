'use client'

import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectCanGoBack } from '@/store/questionnaire/selectors'
import { goToPreviousQuestion } from '@/store/questionnaire/slice'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface NavigationPanelProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
}

const NavigationPanel = (props: NavigationPanelProps) => {
	const { className = '', children, ...rest } = props
	const canGoBack = useAppSelector(selectCanGoBack)
	const dispatch = useAppDispatch()
	const router = useRouter()

	const handleGoBack = () => {
		if (canGoBack) {
			dispatch(goToPreviousQuestion())

			const currentQuestionId = document.cookie
				.split('; ')
				.find(row => row.startsWith('questionnaireProgress='))
				?.split('=')[1]

			if (currentQuestionId) {
				router.push(`/questionnaire/${currentQuestionId}`)
			}
		}
	}

	return (
		<div
			{...rest}
			className={cn('flex flex-col min-h-screen pt-14', {}, [className])}
		>
			<div className='shadow-md fixed top-0 left-0 right-0 bg-white'>
				<div className='relative max-w-5xl w-full mx-auto py-4 flex justify-center items-center'>
					<Link href='/' className='flex items-center'>
						<Image src='/logo.svg' alt='logo' width={24} height={24} />
					</Link>
					{canGoBack && (
						<button
							onClick={handleGoBack}
							className='absolute top-1/2 left-4 -translate-y-1/2 flex items-center text-sm font-medium hover:underline hover:text-primary transition-colors'
						>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M7.5 12L15 4.5L16.05 5.55L9.6 12L16.05 18.45L15 19.5L7.5 12Z'
									fill='currentColor'
								/>
							</svg>
						</button>
					)}
				</div>
			</div>

			{children}
		</div>
	)
}

export default NavigationPanel
