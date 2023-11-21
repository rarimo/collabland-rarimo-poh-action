import { handleSetupAction, handleVerifyAction } from '@/actions'
import { serverConfig } from '@/config/server'
import { verifyCollablandRequest } from '@/helpers/collabland-verify'
import { badRequest, unathorized } from '@/http'

export const POST = async (request: Request) => {
  const interaction = await request.json()
  const verifyResult = await verifyCollablandRequest(request, JSON.stringify(interaction))

  if (!verifyResult.verified) return unathorized(verifyResult.reason)

  if (interaction?.data?.name === serverConfig.setupActionName) {
    return handleSetupAction(interaction)
  }
  if (interaction?.data?.name === serverConfig.verifyActionName) {
    return handleVerifyAction(interaction)
  }

  return badRequest('Unsupported interaction type')
}
