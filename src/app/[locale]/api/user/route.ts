import { collablandApi } from '@/collabland-api'
import { serverConfig } from '@/config/server'
import { go } from '@/helpers/go'
import { logger } from '@/log'
import { CollandLandAccountResponse, CollandLandTokenResponse } from '@/types'

export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return Response.json(
      {
        title: 'Bad Request',
        description: 'Missing required parameters',
        params: {
          code,
        },
      },
      { status: 400 },
    )
  }

  logger.debug('Getting user via collabland api', { code })

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: serverConfig.collablandClientId,
    client_secret: serverConfig.collablandClientSecret,
    redirect_uri: serverConfig.appUrl,
  })

  const [tokenErr, token] = await go(() =>
    collablandApi.post<CollandLandTokenResponse>('/oauth2/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }),
  )

  if (tokenErr) {
    logger.error('Error getting token via collabland api', tokenErr)

    return Response.json(
      {
        title: 'Internal Server Error',
        description: 'Error getting user token',
        params: {
          code,
        },
      },
      { status: 500 },
    )
  }

  const { access_token: accessToken, token_type: tokenType } = token?.data || {}

  const [accountErr, account] = await go(() =>
    collablandApi.get<CollandLandAccountResponse>('/account/me', {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    }),
  )

  if (accountErr) {
    logger.error('Error getting account via collabland api', tokenErr)

    return Response.json(
      {
        title: 'Internal Server Error',
        description: 'Error getting user account',
        params: {
          code,
        },
      },
      { status: 500 },
    )
  }

  return Response.json({ id: account?.data?.id })
}
