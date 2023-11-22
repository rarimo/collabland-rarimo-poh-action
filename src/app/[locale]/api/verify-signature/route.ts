import { utils } from 'ethers'

import { badRequest } from '@/http'
import { logger } from '@/log'

export const POST = async (request: Request) => {
  // TODO: add authentication
  const { message, signature, address } = await request.json()

  if (!message || !signature || !address) return badRequest({ message, signature, address })

  logger.debug('Verifying signature', { message, signature, address })

  const signerAddr = utils.verifyMessage(message, signature)
  const verified = signerAddr.toLowerCase() === address.toLowerCase()

  return Response.json({ verified, message, signature, address })
}
