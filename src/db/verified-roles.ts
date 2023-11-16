import { Knex } from 'knex'

import { VerifiedRolesQ } from '@/types'

export const makeVerifiedRolesQ = (db: Knex): VerifiedRolesQ => {
  const table = () => db('verified_roles')

  return {
    async get(guildID: string) {
      const role = await table().where('guild_id', guildID).first()
      return role ?? null
    },

    async set(guildID: string, roleID: string) {
      await table()
        .insert([{ guild_id: guildID, role_id: roleID }])
        .onConflict('guild_id')
        .merge() // update role id if guild already exists or action was reinstalled with new role id
    },
  }
}