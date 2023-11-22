import { FetcherResponse } from '@distributedlab/fetcher'

import { collablandApi } from '@/collabland-api'
import { serverConfig } from '@/config/server'
import { go } from '@/helpers/go'
import { badRequest, internalError } from '@/http'
import { logger } from '@/log'
import { CollandLandAccountResponse, CollandLandTokenResponse } from '@/types'

export const GET = async (request: Request) => {
  let err: Error | null
  // TODO: add authorization
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (!code) return badRequest({ code })

  logger.debug('Getting user via collabland api', { code })

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: serverConfig.collablandClientId,
    client_secret: serverConfig.collablandClientSecret,
    redirect_uri: serverConfig.appUrl,
  })

  let token: FetcherResponse<CollandLandTokenResponse> | null
  ;[err, token] = await go(() =>
    collablandApi.post<CollandLandTokenResponse>('/oauth2/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }),
  )

  if (err) return internalError('Failed to get access token', err)

  const { access_token: accessToken, token_type: tokenType } = token?.data || {}

  let account: FetcherResponse<CollandLandAccountResponse> | null
  ;[err, account] = await go(() =>
    collablandApi.get<CollandLandAccountResponse>('/account/me', {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    }),
  )

  if (err) return internalError('Failed to get account', err)

  return Response.json({ id: account?.data?.id })
}
