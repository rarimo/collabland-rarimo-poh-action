import { useI18n } from '@/locales/client'

export type ColorString = string
export type TFunction = ReturnType<typeof useI18n>
export type ErrorHandlerPayload = { error: Error; message?: string }
export type StatusMessagePayload = string | ErrorHandlerPayload | { message?: string }
