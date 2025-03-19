import { NextResponse } from "next/server";

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  path?: string;
  maxAge?: number;
};

export function setCookie(
  response: NextResponse,
  name: string,
  value: string,
  options: CookieOptions = {},
) {
  response.cookies.set(name, value, {
    sameSite: "strict",
    path: "/",
    maxAge: options.maxAge ?? 60 * 60 * 24 * 7,
  });
}
