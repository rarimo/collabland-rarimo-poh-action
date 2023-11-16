import { Metadata } from 'next'

import { METADATA } from '@/config'
import { db } from '@/db'
import { go } from '@/helpers'
import { getI18n } from '@/locales/server'
import { logger } from '@/log'
import { VerifiedRole } from '@/types'

export const metadata: Metadata = METADATA

const getVerifiedRole = async (guildId: string): Promise<VerifiedRole | null> => {
  const [err, role] = await go(() => db.verifiedRolesQ.get(guildId))
  if (err) {
    logger.error('Failed to get verification role', { error: err })
    return null
  }

  if (!role) {
    logger.info('No verification role found', { guildId })
    return null
  }

  return { guildId: role.guild_id, roleId: role.role_id }
}

export default async function Index({ searchParams }: { searchParams: { guild_id?: string } }) {
  const i18n = await getI18n()
  const role = await getVerifiedRole(searchParams.guild_id ?? '')

  return (
    <div>
      <p>{i18n('test')}</p>
      <pre>{JSON.stringify(role, null, 2)}</pre>
    </div>
  )
}
