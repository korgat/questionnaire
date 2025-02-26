import { cn } from '@/lib/utils'

interface InfoQuestionProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string
	description?: string
	onContinue: () => void // Changed from passing a value to just signaling continuation
}

const InfoQuestion = (props: InfoQuestionProps) => {
	const { className = '', description, title, onContinue, ...rest } = props

	return (
		<div
			{...rest}
			className={cn(
				'flex justify-center pt-10 flex-grow bg-gradient-to-b from-indigo-900 from-30% via-purple-800 via-60% to-purple-900 to-80%  text-light',
				{},
				[className]
			)}
		>
			<div className='max-w-96 w-full px-4'>
				<h3 className='text-2xl font-bold first-letter:uppercase mb-5'>
					{title}
				</h3>
				<div className='text-white/90 text-sm mb-10'>{description}</div>
				<button
					onClick={onContinue}
					className='w-full py-3 px-4 bg-white/90 text-purple-700 rounded-lg font-medium hover:bg-white transition-colors shadow-sm shadow-white '
				>
					Continue
				</button>
			</div>
		</div>
	)
}

export default InfoQuestion
