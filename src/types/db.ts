import { VerifiedRolesQ } from './verified-role'

export interface DB {
  get verifiedRolesQ(): VerifiedRolesQ
}
