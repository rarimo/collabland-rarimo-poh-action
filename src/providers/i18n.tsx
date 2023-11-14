'use client'

import { ReactNode } from 'react'

import { I18nProviderClient } from '@/locales/client'

export const I18nProvider = ({ children, locale }: { children: ReactNode; locale: string }) => {
  return (
    <I18nProviderClient locale={locale} fallback={<div />}>
      {children}
    </I18nProviderClient>
  )
}
