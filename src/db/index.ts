import { DB } from '@/types'

import { pg } from './pg'
import { makeVerifiedRolesQ } from './verified-roles'

const verifiedRolesQ = makeVerifiedRolesQ(pg)

export const db: DB = {
  get verifiedRolesQ() {
    return verifiedRolesQ
  },
}
