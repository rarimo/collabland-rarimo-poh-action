import { VerifiedRoleRow } from '@/types'

declare module 'knex/types/tables' {
  interface Tables {
    verified_roles: VerifiedRoleRow
  }
}
