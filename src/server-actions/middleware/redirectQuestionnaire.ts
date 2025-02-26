import { NextRequest, NextResponse } from 'next/server'
import { nextRedirect } from './utils/nextRedirect'
import { setCookie } from './utils/setCookie'

export function redirectQuestionnaire(request: NextRequest) {
	const cookieValue = request.cookies.get('questionnaireProgress')?.value
	const pathname = request.nextUrl.pathname

	if (cookieValue && pathname.endsWith(`/questionnaire/${cookieValue}`)) {
		return NextResponse.next()
	}

	if (cookieValue) {
		const response = nextRedirect(`/questionnaire/${cookieValue}`, request.url)
		setCookie(response, 'questionnaireProgress', cookieValue)

		return response
	}
	const response = nextRedirect(`/questionnaire/init`, request.url)
	setCookie(response, 'questionnaireProgress', 'init')
	return response
}
