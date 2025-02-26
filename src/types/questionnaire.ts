export type QuestionType = 'radio' | 'select' | 'text' | 'info'

export interface Option {
	value: string
	label: string
	icon?: string
}

export interface NavigationRule {
	condition: {
		field: string
		value: string
	}
	nextId: string
}

export interface DynamicValuesDefaults {
	[key: string]: Record<string, string>
}

export type QuestionAnswer = string

export interface QuestionnaireAnswers {
	[questionId: string]: QuestionAnswer
}

export interface Question {
	id: string
	field?: string
	type: QuestionType
	title: string
	dynamicValues?: DynamicValuesDefaults
	description?: string
	options?: Option[]
	showContinueButton?: boolean
	navigationRule: NavigationRule[] | string
}

export interface Questionnaire {
	id: string
	title: string
	description?: string
	startQuestionId: string
	questions: Record<string, Question>
}
