'use client'

import { questionnaireConfig } from '@/config/questionnaires/config'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectAnswers } from '@/store/questionnaire/selectors'
import { resetQuestionnaire } from '@/store/questionnaire/slice'
import { useRouter } from 'next/navigation'
import { getOptionLabel, getQuestionTitleByField } from './helpers'

export default function CompletedPage() {
	const questions = questionnaireConfig.questions
	const answers = useAppSelector(selectAnswers)
	const dispatch = useAppDispatch()
	const router = useRouter()

	const handleRestart = () => {
		dispatch(resetQuestionnaire())
		router.push('/questionnaire/init')
	}

	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-purple-200  py-10 px-4'>
			<div className='max-w-2xl w-full rounded-2xl bg-white p-6 md:p-8 shadow-xl'>
				<div className='flex flex-col items-center text-center mb-4 md:mb-8'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='white'
						className='w-12 h-12 md:w-16 md:h-16 bg-purple-600 p-2 md:p-3 rounded-full mb-5'
					>
						<path
							fillRule='evenodd'
							d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
							clipRule='evenodd'
						/>
					</svg>

					<h1 className='text-2xl md:text-3xl font-bold text-gray-900 '>
						You successfully completed questionnaire!
					</h1>
				</div>

				<div className='mb-8'>
					<h2 className='text-lg md:text-xl font-semibold mb-4 border-b pb-2'>
						Your Responses Summary
					</h2>
					<div className='space-y-2 md:space-y-4'>
						{Object.entries(answers).map(([field, value]) => (
							<div key={field} className='bg-muted p-4 rounded-lg'>
								<h3 className=' text-gray-700 text-lg  font-semibold first-letter:uppercase mb-2'>
									{getQuestionTitleByField(field, answers, questions)}
								</h3>
								<p className='text-purple-700 mt-1'>
									{getOptionLabel(field, value as string, questions)}
								</p>
							</div>
						))}
					</div>
				</div>

				<button
					onClick={handleRestart}
					className='py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex-1'
				>
					Restart Questionnaire
				</button>
			</div>
		</div>
	)
}
