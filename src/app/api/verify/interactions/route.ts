import { handleVerifyAction } from '@/actions'
import { VERIFY_ACTION_NAME } from '@/const'
import { verifyCollablandRequest } from '@/helpers'
import { badRequestAction, unathorizedAction } from '@/http'

export const POST = async (request: Request) => {
  const interaction = await request.json()
  const verifyResult = await verifyCollablandRequest(request, JSON.stringify(interaction))

  if (!verifyResult.verified) return unathorizedAction(verifyResult.reason)

  if (interaction?.data?.name === VERIFY_ACTION_NAME) {
    return handleVerifyAction(interaction)
  }

  return badRequestAction('Unsupported interaction type')
}
