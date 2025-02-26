import { QuestionnaireStorageE } from '@/config/questionnaires/consts'
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
	currentQuestionId: 'init',
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
				storageService.set(QuestionnaireStorageE.answers, updatedAnswers)
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

			Cookies.set(QuestionnaireStorageE.progress, newQuestionId, {
				path: '/',
				expires: 7, // 7 days
			})

			try {
				storageService.set(QuestionnaireStorageE.history, state.history)
			} catch (error) {
				console.error('Error saving history to localStorage:', error)
			}
		},

		goToPreviousQuestion: state => {
			if (state.history.length > 0) {
				const previousQuestionId = state.history.pop()

				if (previousQuestionId) {
					state.currentQuestionId = previousQuestionId

					Cookies.set(QuestionnaireStorageE.progress, previousQuestionId, {
						path: '/',
						expires: 7,
					})

					try {
						storageService.set(QuestionnaireStorageE.history, state.history)
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
			Cookies.set(QuestionnaireStorageE.progress, 'completed', {
				path: '/',
				expires: 7,
			})

			try {
				storageService.set(QuestionnaireStorageE.history, state.history)
			} catch (error) {
				console.error('Error saving history to localStorage:', error)
			}
		},

		initializeFromStorage: state => {
			try {
				const savedAnswers = storageService.get(QuestionnaireStorageE.answers)
				debugger
				if (savedAnswers) {
					state.answers = savedAnswers
				}

				const currentQuestionId = Cookies.get(QuestionnaireStorageE.progress)
				if (currentQuestionId && currentQuestionId !== 'completed') {
					state.currentQuestionId = currentQuestionId
				}

				const savedHistory = storageService.get(QuestionnaireStorageE.history)
				if (savedHistory) {
					state.history = savedHistory
				}

				if (currentQuestionId === 'completed') {
					state.isCompleted = true
				}
			} catch (error) {
				console.error('Error loading from storage:', error)
			}
		},

		resetQuestionnaire: state => {
			state.answers = {}
			state.currentQuestionId = 'init'
			state.history = []
			state.isCompleted = false

			storageService.delete(QuestionnaireStorageE.answers)
			storageService.delete(QuestionnaireStorageE.history)
			Cookies.set(QuestionnaireStorageE.progress, 'init', {
				path: '/',
				expires: 7,
			})
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
