import {
	QUESTIONNAIRE_STEPS,
	QUESTIONNAIRE_STORAGE,
} from '@/config/questionnaires/consts'
import { storageService } from '@/services/storageService'
import { QuestionAnswer, QuestionnaireAnswers } from '@/types/questionnaire'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

interface QuestionnaireState {
	answers: QuestionnaireAnswers
	currentQuestionId: string
	history: string[]
	isCompleted: boolean
}

const initialState: QuestionnaireState = {
	answers: {},
	currentQuestionId: QUESTIONNAIRE_STEPS.startStep,
	history: [],
	isCompleted: false,
}

export const questionnaireSlice = createSlice({
	name: 'questionnaire',
	initialState,
	reducers: {
		saveAnswer: (
			state,
			action: PayloadAction<{
				field: string
				answer: QuestionAnswer
			}>
		) => {
			const { field, answer } = action.payload

			state.answers[field] = answer

			try {
				const updatedAnswers = { ...state.answers }
				storageService.set(QUESTIONNAIRE_STORAGE.answers, updatedAnswers)
			} catch (error) {
				console.error('Error saving to localStorage:', error)
			}
		},

		setCurrentQuestion: (state, action: PayloadAction<string>) => {
			const newQuestionId = action.payload

			if (
				state.currentQuestionId !== newQuestionId &&
				(state.history.length === 0 ||
					state.history[state.history.length - 1] !== state.currentQuestionId)
			) {
				state.history.push(state.currentQuestionId)
			}

			state.currentQuestionId = newQuestionId

			Cookies.set(QUESTIONNAIRE_STORAGE.progress, newQuestionId, {
				path: '/',
				expires: 7, // 7 days
			})

			try {
				storageService.set(QUESTIONNAIRE_STORAGE.history, state.history)
			} catch (error) {
				console.error('Error saving history to localStorage:', error)
			}
		},

		goToPreviousQuestion: state => {
			if (state.history.length > 0) {
				const previousQuestionId = state.history.pop()

				if (previousQuestionId) {
					state.currentQuestionId = previousQuestionId

					Cookies.set(QUESTIONNAIRE_STORAGE.progress, previousQuestionId, {
						path: '/',
						expires: 7,
					})

					try {
						storageService.set(QUESTIONNAIRE_STORAGE.history, state.history)
					} catch (error) {
						console.error('Error saving history to localStorage:', error)
					}
				}
			}
		},

		completeQuestionnaire: state => {
			if (
				state.history.length === 0 ||
				state.history[state.history.length - 1] !== state.currentQuestionId
			) {
				state.history.push(state.currentQuestionId)
			}

			state.isCompleted = true
			Cookies.set(QUESTIONNAIRE_STORAGE.progress, QUESTIONNAIRE_STEPS.endStep, {
				path: '/',
				expires: 7,
			})

			try {
				storageService.set(QUESTIONNAIRE_STORAGE.history, state.history)
			} catch (error) {
				console.error('Error saving history to localStorage:', error)
			}
		},

		initializeFromStorage: state => {
			try {
				const savedAnswers = storageService.get(QUESTIONNAIRE_STORAGE.answers)

				if (savedAnswers) {
					state.answers = savedAnswers
				}

				const currentQuestionId = Cookies.get(QUESTIONNAIRE_STORAGE.progress)
				if (
					currentQuestionId &&
					currentQuestionId !== QUESTIONNAIRE_STEPS.endStep
				) {
					state.currentQuestionId = currentQuestionId
				}

				const savedHistory = storageService.get(QUESTIONNAIRE_STORAGE.history)
				if (savedHistory) {
					state.history = savedHistory
				}

				if (currentQuestionId === QUESTIONNAIRE_STEPS.endStep) {
					state.isCompleted = true
				}
			} catch (error) {
				console.error('Error loading from storage:', error)
			}
		},

		resetQuestionnaire: state => {
			state.answers = {}
			state.currentQuestionId = QUESTIONNAIRE_STEPS.startStep
			state.history = []
			state.isCompleted = false

			storageService.delete(QUESTIONNAIRE_STORAGE.answers)
			storageService.delete(QUESTIONNAIRE_STORAGE.history)
			Cookies.set(
				QUESTIONNAIRE_STORAGE.progress,
				QUESTIONNAIRE_STEPS.startStep,
				{
					path: '/',
					expires: 7,
				}
			)
		},
	},
})

export const {
	saveAnswer,
	setCurrentQuestion,
	goToPreviousQuestion,
	completeQuestionnaire,
	initializeFromStorage,
	resetQuestionnaire,
} = questionnaireSlice.actions

export default questionnaireSlice.reducer
