import * as yup from 'yup'

import {
  GOERLI_CHAIN_ID,
  POLYGON_CHAIN_ID,
  SUPPORTED_CHAINS_DEVNET,
  SUPPORTED_CHAINS_MAINNET,
} from '@/const'
import { ClientConfig } from '@/types'

import { sharedValidationSchema } from './shared'
import { APP_DESCRIPTION, APP_NAME } from './static'

const validationSchema = yup.object({
  ...sharedValidationSchema,
  pohAppUrl: yup.string().required(),
})

const loadCfg = (): ClientConfig => {
  const config = validationSchema.cast({
    // static
    appName: APP_NAME,
    appDescription: APP_DESCRIPTION,

    // configurable
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    collablandClientId: process.env.NEXT_PUBLIC_COLLABLAND_CLIENT_ID,
    collablandApiUrl: process.env.NEXT_PUBLIC_COLLABLAND_API_URL,
    env: process.env.NEXT_PUBLIC_ENVIRONMENT,
    pohAppUrl: process.env.NEXT_PUBLIC_POH_APP_URL,
  })

  const validated = validationSchema.validateSync(config, {
    strict: true,
    abortEarly: true,
  })

  const isMainnet = validated.env === 'mainnet'

  return {
    ...validated,
    supportedChains: isMainnet ? SUPPORTED_CHAINS_MAINNET : SUPPORTED_CHAINS_DEVNET,
    targetChainId: isMainnet ? POLYGON_CHAIN_ID : GOERLI_CHAIN_ID,
  }
}

export const clientConfig = loadCfg()
