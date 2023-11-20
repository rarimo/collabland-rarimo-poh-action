import { utils } from 'ethers'

import { logger } from '@/log'

export const POST = async (request: Request) => {
  const { message, signature, address } = await request.json()

  if (!message || !signature || !address) {
    return Response.json({
      title: 'Bad Request',
      description: 'Missing required parameters',
      params: {
        message,
        signature,
        address,
      },
    })
  }

  logger.debug('Verifying signature', { message, signature, address })

  const signerAddr = utils.verifyMessage(message, signature)
  const verified = signerAddr.toLowerCase() === address.toLowerCase()

  return Response.json({ verified })
}
