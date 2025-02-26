import { NextRequest, NextResponse } from 'next/server'
import { nextRedirect } from './utils/nextRedirect'
import { setCookie } from './utils/setCookie'
import {
	QUESTIONNAIRE_STEPS,
	QUESTIONNAIRE_STORAGE,
} from '@/config/questionnaires/consts'

export function redirectQuestionnaire(request: NextRequest) {
	const cookieValue = request.cookies.get(QUESTIONNAIRE_STORAGE.progress)?.value
	const pathname = request.nextUrl.pathname

	if (cookieValue && pathname.endsWith(`/questionnaire/${cookieValue}`)) {
		return NextResponse.next()
	}

	if (cookieValue) {
		const response = nextRedirect(`/questionnaire/${cookieValue}`, request.url)
		setCookie(response, QUESTIONNAIRE_STORAGE.progress, cookieValue)

		return response
	}
	const response = nextRedirect(
		`/questionnaire/${QUESTIONNAIRE_STEPS.startStep}`,
		request.url
	)
	setCookie(
		response,
		QUESTIONNAIRE_STORAGE.progress,
		QUESTIONNAIRE_STEPS.startStep
	)
	return response
}
