import * as yup from 'yup'

import { APP_DESCRIPTION, APP_NAME } from '@/config/static'
import { DEFAULT_SETUP_ACTION_NAME, DEFAULT_VERIFY_ACTION_NAME } from '@/const'
import { ServerConfig } from '@/types'

import { sharedValidationSchema } from './shared'

const validationSchema = yup.object({
  ...sharedValidationSchema,
  loglevel: yup.string().optional().default('debug'),
  dbUrl: yup.string().required(),
  skipVerification: yup.boolean().required(),
  collablandClientSecret: yup.string().required(),
  collablandClientApiKey: yup.string().required(),
  collablandEcdsaPublicKey: yup.string().required(),
  collablandEd25519PublicKeyHex: yup.string().required(),
  setupActionName: yup.string().optional().default(DEFAULT_SETUP_ACTION_NAME),
  verifyActionName: yup.string().optional().default(DEFAULT_VERIFY_ACTION_NAME),
})

const loadCfg = (): ServerConfig => {
  const skipVerification = process.env.SKIP_VERIFICATION

  const config = validationSchema.cast({
    // static
    appName: APP_NAME,
    appDescription: APP_DESCRIPTION,

    // configurable
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    loglevel: process.env.LOG_LEVEL,
    dbUrl: process.env.DB_URL,
    skipVerification: skipVerification ? skipVerification === 'true' : false,
    collablandClientId: process.env.NEXT_PUBLIC_COLLABLAND_CLIENT_ID,
    collablandClientSecret: process.env.COLLABLAND_CLIENT_SECRET,
    collablandClientApiKey: process.env.COLLABLAND_CLIENT_API_KEY,
    collablandEcdsaPublicKey: process.env.COLLABLAND_ECDSA_PUBLIC_KEY,
    collablandEd25519PublicKeyHex: process.env.COLLABLAND_ED25519_PUBLIC_KEY_HEX,
    setupActionName: process.env.SETUP_ACTION_NAME,
    verifyActionName: process.env.VERIFY_ACTION_NAME,
  })

  return validationSchema.validateSync(config, {
    strict: true,
    abortEarly: true,
  })
}

export const serverConfig = loadCfg()
