import nacl from 'tweetnacl'

import { config } from '@/config'
import { ACTION_ED25519_SIGNATURE_HEADER, ACTION_SIGNATURE_TIMESTAMP_HEADER } from '@/const'
import { logger } from '@/log'

const log = logger.child({ service: 'collabland-signature-verifier' })

type VerifyRequestResult = {
  verified: boolean
  reason?: string
}

export const verifyCollablandRequest = async (
  req: Request,
  body: string,
): Promise<VerifyRequestResult> => {
  if (config.skipVerification) return { verified: true }

  const signature = req.headers.get(ACTION_ED25519_SIGNATURE_HEADER)
  const signatureTimestamp: number = Number(
    req.headers.get(ACTION_SIGNATURE_TIMESTAMP_HEADER)?.toString() ?? '0',
  )

  if (!signature) {
    return {
      verified: false,
      reason: `${ACTION_ED25519_SIGNATURE_HEADER} header is required`,
    }
  }

  return verifyRequest(body, signatureTimestamp, signature)
}

const verifyRequest = (
  body: string,
  signatureTimestamp: number,
  signature: string,
): VerifyRequestResult => {
  const delta = Math.abs(Date.now() - signatureTimestamp)

  if (delta >= 5 * 60 * 1000) {
    return {
      verified: false,
      reason: 'Invalid request - signature timestamp is expired.',
    }
  }

  const msg = signatureTimestamp + body
  return verifyRequestWithEd25519(signature, msg)
}

const verifyRequestWithEd25519 = (signature: string, msg: string): VerifyRequestResult => {
  const publicKey = config.collablandEd25519PublicKeyHex
  let verified = false

  try {
    log.debug('Verifying request with Ed25519 signature...', { publicKey, signature, msg })

    verified = nacl.sign.detached.verify(
      Buffer.from(msg, 'utf-8'),
      Buffer.from(signature, 'hex'),
      Buffer.from(publicKey, 'hex'),
    )
    log.debug('Signature verified', { verified })
  } catch (err: any) {
    verified = false
    log.error(`Failed to verify Ed25518 signature: ${err.message}`, err)
  }

  if (!verified) {
    return { verified, reason: 'Invalid request - Ed25519 signature cannot be verified' }
  }

  return { verified }
}
