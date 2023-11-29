import { handleVerifyAction } from '@/actions'
import { verifyCollablandRequest } from '@/helpers'
import { badRequestAction, unathorizedAction } from '@/http'

export const POST = async (request: Request) => {
  const interaction = await request.json()
  const verifyResult = await verifyCollablandRequest(request, JSON.stringify(interaction))

  if (!verifyResult.verified) return unathorizedAction(verifyResult.reason)

  if (interaction?.data?.name === 'verify') {
    return handleVerifyAction(interaction)
  }

  return badRequestAction('Unsupported interaction type')
}
