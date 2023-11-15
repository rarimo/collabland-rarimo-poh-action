import { utils } from 'ethers'
import nacl from 'tweetnacl'

import { CONFIG } from '@/config'
import {
  ACTION_ECDSA_SIGNATURE_HEADER,
  ACTION_ED25519_SIGNATURE_HEADER,
  ACTION_SIGNATURE_TIMESTAMP_HEADER,
} from '@/const'
import { logger } from '@/log'

const log = logger.child({ service: 'collabland-signature-verifier' })

type VerifyRequestResult = {
  verified: boolean
  reason?: string
}

enum SignatureTypes {
  ECDSA = 'ecdsa',
  ED25519 = 'ed25519',
}

export const verifyCollablandRequest = (req: Request): VerifyRequestResult => {
  if (CONFIG.skipVerification) return { verified: true }

  const ecdsaSignature = req.headers.get(ACTION_ECDSA_SIGNATURE_HEADER)
  const ed25519Signature = req.headers.get(ACTION_ED25519_SIGNATURE_HEADER)
  const signatureTimestamp: number = Number(
    req.headers.get(ACTION_SIGNATURE_TIMESTAMP_HEADER)?.toString() ?? '0',
  )

  const body = JSON.stringify(req.body)
  const signature = ecdsaSignature ?? ed25519Signature

  if (!signature) {
    return {
      verified: false,
      reason: `${ACTION_ECDSA_SIGNATURE_HEADER} or ${ACTION_ED25519_SIGNATURE_HEADER} header is required`,
    }
  }

  if (!CONFIG.collablandActionPublicKey) {
    return {
      verified: false,
      reason: 'Collabland action public key is not set.',
    }
  }

  const signatureType = signature === ecdsaSignature ? SignatureTypes.ECDSA : SignatureTypes.ED25519

  return verifyRequest(body, signatureTimestamp, signature, signatureType)
}

const verifyRequest = (
  body: string,
  signatureTimestamp: number,
  signature: string,
  signatureType: SignatureTypes,
): VerifyRequestResult => {
  const delta = Math.abs(Date.now() - signatureTimestamp)

  if (delta >= 5 * 60 * 1000) {
    return {
      verified: false,
      reason: 'Invalid request - signature timestamp is expired.',
    }
  }

  const msg = signatureTimestamp + body

  if (signatureType === SignatureTypes.ED25519) {
    return verifyRequestWithEd25519(signature, msg)
  }

  return verifyRequestWithEcdsa(signature, msg)
}

const verifyRequestWithEd25519 = (signature: string, msg: string): VerifyRequestResult => {
  const publicKey = CONFIG.collablandActionPublicKey
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
    log.error(`Failed to verify Ed25518 signature: ${err.message}`, { error: err })
  }

  if (!verified) {
    return { verified, reason: 'Invalid request - Ed25519 signature cannot be verified' }
  }

  return { verified }
}

const verifyRequestWithEcdsa = (signature: string, msg: string): VerifyRequestResult => {
  const publicKey = CONFIG.collablandActionPublicKey
  let verified = false

  try {
    log.debug('Verifying request with Ecdsa signature...', { publicKey, signature, msg })
    const digest = utils.hashMessage(msg)
    verified = signature != null && utils.recoverPublicKey(digest, signature) === publicKey
    log.debug('Signature verified', { verified })
  } catch (err: any) {
    verified = false
    log.error(`Failed to verify Ecdsa signature: ${err.message}`, { error: err })
  }

  if (!verified) {
    return { verified, reason: 'Invalid request - Ecdsa signature cannot be verified' }
  }

  return { verified }
}
