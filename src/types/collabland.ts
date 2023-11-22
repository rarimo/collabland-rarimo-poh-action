export type CollandLandTokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  refresh_token: string
}

export type CollandLandAccountResponse = {
  id: string
  platform: string
  client_id: string
  scope: string
  user_id: string
  expires_in: number
  grant_type: string
  user_profile: {
    platform: string
    id: string
    name: string
    idp: string
    metadata: {
      id: string
      username: string
      avatar: string
      discriminator: string
      public_flags: number
      premium_type: number
      flags: number
      accent_color: number
      global_name: string
      banner_color: string
    }
  }
  type: string
  idp: string
}

export type CollablandCheckRolesResponse = {
  roles: {
    id: string
    granted: boolean
  }[]
}
