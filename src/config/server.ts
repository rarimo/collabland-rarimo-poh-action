import * as yup from 'yup'

import { APP_DESCRIPTION, APP_NAME } from '@/config/static'
import {
  DEFAULT_SETUP_ACTION_NAME,
  DEFAULT_VERIFY_ACTION_NAME,
  GOERLI_CHAIN_ID,
  GOERLI_SBT_CONTRACT,
  POLYGON_CHAIN_ID,
  POLYGON_SBT_CONTRACT,
} from '@/const'
import { ServerConfig } from '@/types'

import { sharedValidationSchema } from './shared'

const validationSchema = yup.object({
  ...sharedValidationSchema,
  loglevel: yup.string().optional().default('debug'),
  dbUrl: yup.string().required(),
  skipVerification: yup.boolean().required(),
  collablandClientSecret: yup.string().required(),
  collablandApiKey: yup.string().required(),
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
    collablandApiUrl: process.env.NEXT_PUBLIC_COLLABLAND_API_URL,
    collablandClientId: process.env.NEXT_PUBLIC_COLLABLAND_CLIENT_ID,
    collablandClientSecret: process.env.COLLABLAND_CLIENT_SECRET,
    collablandApiKey: process.env.COLLABLAND_API_KEY,
    collablandEcdsaPublicKey: process.env.COLLABLAND_ECDSA_PUBLIC_KEY,
    collablandEd25519PublicKeyHex: process.env.COLLABLAND_ED25519_PUBLIC_KEY_HEX,
    setupActionName: process.env.SETUP_ACTION_NAME,
    verifyActionName: process.env.VERIFY_ACTION_NAME,
    env: process.env.NEXT_PUBLIC_ENVIRONMENT,
  })

  const validated = validationSchema.validateSync(config, {
    strict: true,
    abortEarly: true,
  })

  const isMainnet = validated.env === 'mainnet'

  return {
    ...validated,
    targetChainId: isMainnet ? POLYGON_CHAIN_ID : GOERLI_CHAIN_ID,
    sbtContractAddress: isMainnet ? POLYGON_SBT_CONTRACT : GOERLI_SBT_CONTRACT,
  }
}

export const serverConfig = loadCfg()
