import { Chain, ChainId } from '@distributedlab/w3p'
import { Metadata } from 'next'
import * as yup from 'yup'

import {
  DEFAULT_SETUP_ACTION_NAME,
  DEFAULT_VERIFY_ACTION_NAME,
  GOERLI_CHAIN_ID,
  POLYGON_CHAIN_ID,
  SUPPORTED_CHAINS_DEVNET,
  SUPPORTED_CHAINS_MAINNET,
} from '@/const'

type Config = {
  appUrl: string
  appName: string
  appDescription: string
  loglevel: string
  dbUrl: string
  skipVerification: boolean
  collablandEcdsaPublicKey: string
  collablandEd25519PublicKeyHex: string
  setupActionName: string
  verifyActionName: string
  targetChainId: ChainId
  supportedChains: Chain[]
  env: 'devnet' | 'mainnet'
}

const validationSchema = yup.object({
  loglevel: yup.string().optional().default('debug'),
  appUrl: yup.string().required(),
  appName: yup.string().required(),
  appDescription: yup.string().required(),
  dbUrl: yup.string().required(),
  skipVerification: yup.boolean().required(),
  collablandEcdsaPublicKey: yup.string().required(),
  collablandEd25519PublicKeyHex: yup.string().required(),
  setupActionName: yup.string().optional().default(DEFAULT_SETUP_ACTION_NAME),
  verifyActionName: yup.string().optional().default(DEFAULT_VERIFY_ACTION_NAME),
  env: yup.string().oneOf(['devnet', 'mainnet']).required(),
})

const loadConfiguration = (): Config => {
  const skipVerification = process.env.NEXT_PUBLIC_SKIP_VERIFICATION

  /* eslint-disable prettier/prettier */
  const config = validationSchema.cast({
    // static
    appName: 'Rarimo Proof of Humanity Verify Page',
    appDescription: "Verify Discord server's members humanity using the Rarimo Proof of Humanity case and Collab.land bot.",

    // configurable
    loglevel: process.env.NEXT_PUBLIC_LOG_LEVEL,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    dbUrl: process.env.NEXT_PUBLIC_DB_URL,
    skipVerification: skipVerification ? skipVerification === 'true' : false,
    collablandEcdsaPublicKey: process.env.NEXT_PUBLIC_COLLABLAND_ECDSA_PUBLIC_KEY,
    collablandEd25519PublicKeyHex: process.env.NEXT_PUBLIC_COLLABLAND_ED25519_PUBLIC_KEY_HEX,
    setupActionName: process.env.NEXT_PUBLIC_SETUP_ACTION_NAME,
    verifyActionName: process.env.NEXT_PUBLIC_VERIFY_ACTION_NAME,
    env: process.env.NEXT_PUBLIC_ENVIRONMENT,
  })
  /* eslint-enable prettier/prettier */

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

export const config: Config = loadConfiguration()

export const METADATA: Metadata = {
  metadataBase: new URL(config.appUrl),
  description: config.appDescription,
  applicationName: config.appName,
  title: config.appName,
  themeColor: '#ffffff',
  colorScheme: 'light',
  // eslint-disable-next-line prettier/prettier
  viewport: 'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0',
  creator: 'Zero Block Global Foundation',
  openGraph: {
    title: config.appName,
    description: config.appDescription,
    locale: 'en_GB',
    type: 'website',
    images: '/thumbnail.jpg',
  },
  twitter: {
    description: config.appDescription,
    title: config.appName,
    card: 'summary_large_image',
    images: '/thumbnail.jpg',
  },
}
