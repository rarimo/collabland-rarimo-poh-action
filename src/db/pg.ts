import knex from 'knex'

import { CONFIG } from '@/config'

export const pg = knex({
  client: 'pg',
  connection: CONFIG.dbUrl,
  useNullAsDefault: true,
})
