import { NextRequest } from 'next/server'
import { createI18nMiddleware } from 'next-international/middleware'

const DEFAULT_LOCALE = 'en'
const ACCEPTED_LOCALES = ['en']

const I18nMiddleware = createI18nMiddleware({
  locales: ACCEPTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  urlMappingStrategy: 'rewrite',
})

export function middleware(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
