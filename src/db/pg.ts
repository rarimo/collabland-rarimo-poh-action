import knex from 'knex'

import { serverConfig } from '@/config/server'

export const pg = knex({
  client: 'pg',
  connection: serverConfig.dbUrl,
  useNullAsDefault: true,
})
