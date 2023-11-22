import { handleSetupAction, handleVerifyAction } from '@/actions'
import { serverConfig } from '@/config/server'
import { verifyCollablandRequest } from '@/helpers/collabland-verify'
import { badRequestAction, unathorizedAction } from '@/http'

export const POST = async (request: Request) => {
  const interaction = await request.json()
  const verifyResult = await verifyCollablandRequest(request, JSON.stringify(interaction))

  if (!verifyResult.verified) return unathorizedAction(verifyResult.reason)

  if (interaction?.data?.name === serverConfig.setupActionName) {
    return handleSetupAction(interaction)
  }
  if (interaction?.data?.name === serverConfig.verifyActionName) {
    return handleVerifyAction(interaction)
  }

  return badRequestAction('Unsupported interaction type')
}
