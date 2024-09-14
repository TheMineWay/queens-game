import { Locale } from "@/constants/i18n/locale.enum";
import { LOCALES } from "@/constants/i18n/locales";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Get the preferred locale, this function should return a valid locale string
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";

  // Return the first matching locale, or default to 'en-US'
  return (
    LOCALES.find((locale) => acceptLanguage.includes(locale)) || Locale.EN_US
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname has a supported locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale in the pathname
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl.origin);

  // Redirect to the new URL with the preferred locale
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
