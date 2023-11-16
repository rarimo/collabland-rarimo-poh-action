import { handleSetupAction, handleVerifyAction } from '@/actions'
import { DEFAULT_SETUP_ACTION_NAME, DEFAULT_VERIFY_ACTION_NAME } from '@/const'
import { verifyCollablandRequest } from '@/helpers'
import { badRequest, unathorized } from '@/http'

export const POST = async (request: Request) => {
  const verifyResult = verifyCollablandRequest(request)

  if (!verifyResult.verified) return unathorized(verifyResult.reason)

  const interaction = await request.json()

  if (interaction?.data?.name === DEFAULT_SETUP_ACTION_NAME) return handleSetupAction(interaction)
  if (interaction?.data?.name === DEFAULT_VERIFY_ACTION_NAME) return handleVerifyAction(interaction)

  return badRequest('Unsupported interaction type')
}
