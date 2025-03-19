import { NextResponse, type NextRequest } from "next/server";
import { redirectQuestionnaire } from "./server-actions/middleware/redirectQuestionnaire";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.includes("questionnaire")) {
    return redirectQuestionnaire(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/questionnaire/:path*"],
};
