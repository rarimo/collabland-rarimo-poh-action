import knex from 'knex'

import { config } from '@/config'

export const pg = knex({
  client: 'pg',
  connection: config.dbUrl,
  useNullAsDefault: true,
})
