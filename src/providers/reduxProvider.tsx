'use client'

import { store } from '@/store'
import { Provider } from 'react-redux'
import React, { useEffect } from 'react'
import { initializeFromStorage } from '@/store/questionnaire/slice'

interface ReduxProviderProps {
	children: React.ReactNode
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
	useEffect(() => {
		store.dispatch(initializeFromStorage())
	}, [])

	return <Provider store={store}>{children}</Provider>
}
