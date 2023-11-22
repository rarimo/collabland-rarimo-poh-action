import { FetcherResponse } from '@distributedlab/fetcher'

import { collablandApi } from '@/collabland-api'
import { serverConfig } from '@/config/server'
import { db } from '@/db'
import { go } from '@/helpers/go'
import { badRequest, internalError, notFound } from '@/http'
import { CollablandCheckRolesResponse, VerifiedRoleRow } from '@/types'

export const GET = async (request: Request) => {
  let err: Error | null
  // TODO: add authorization
  const url = new URL(request.url)
  const address = url.searchParams.get('address')
  const guildId = url.searchParams.get('guildId')

  if (!address || !guildId) return badRequest({ address, guildId })

  let verifiedRole: VerifiedRoleRow | null
  ;[err, verifiedRole] = await go(() => db.verifiedRolesQ.get(guildId))
  if (err) return internalError('Failed to get role', err)
  if (!verifiedRole) return notFound({ guildId })

  let grant: FetcherResponse<CollablandCheckRolesResponse> | null
  ;[err, grant] = await go(() =>
    collablandApi.post<CollablandCheckRolesResponse>('/access-control/check-roles', {
      headers: {
        'X-Api-Key': serverConfig.collablandApiKey,
      },
      body: {
        account: address,
        rules: [
          {
            type: 'ERC721',
            chainId: serverConfig.targetChainId,
            minToken: '1',
            contractAddress: serverConfig.sbtContractAddress,
            roleId: verifiedRole?.role_id,
          },
        ],
      },
    }),
  )
  if (err) return internalError('Failed to check role', err)

  const granted = grant?.data?.roles?.[0]?.granted ?? false

  return Response.json({ granted })
}
