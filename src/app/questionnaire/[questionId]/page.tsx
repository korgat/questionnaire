import { QuestionContainer } from '@/components/questions/QuestionContainer'
import { questionnaireConfig } from '@/config/questionnaires/config'
import type { Metadata } from 'next'

interface IChanelPageProps {
	params: Promise<{ questionId: string }>
}

export const dynamic = 'force-static'

export async function generateStaticParams() {
	const data = questionnaireConfig.questions
	const questionPages = Object.keys(data).map(questionId => ({
		questionId: questionId,
	}))

	return questionPages
}

export async function generateMetadata({
	params,
}: IChanelPageProps): Promise<Metadata> {
	const { questionId } = await params
	const { title } = questionnaireConfig.questions[questionId]

	return {
		title: questionId,
		description: title.slice(0, 150),
	}
}

export default async function QuestionPage({ params }: IChanelPageProps) {
	const { questionId } = await params
	const question = questionnaireConfig.questions[questionId]

	return <QuestionContainer question={question} />
}
