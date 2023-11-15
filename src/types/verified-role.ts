export interface VerifiedRolesQ {
  get(guildID: string): Promise<VerifiedRoleRow | null>
  set(guildID: string, roleID: string): Promise<void>
}

export type VerifiedRoleRow = {
  guild_id: string
  role_id: string
}

export type VerifiedRole = {
  guildId: string
  roleId: string
}
