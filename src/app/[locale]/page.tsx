import { Metadata } from 'next'

import { METADATA } from '@/config'
import { getI18n } from '@/locales/server'

export const metadata: Metadata = METADATA

export default async function Index() {
  const i18n = await getI18n()

  return (
    <div>
      <p>{i18n('test')}</p>
    </div>
  )
}
