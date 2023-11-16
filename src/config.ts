import { Metadata } from 'next'
import * as yup from 'yup'

import { DEFAULT_SETUP_ACTION_NAME, DEFAULT_VERIFY_ACTION_NAME } from '@/const'

const env = (value?: string): string => value ?? ''

type Config = {
  appUrl: string
  appName: string
  appDescription: string
  loglevel: string
  dbUrl: string
  skipVerification: boolean
  collablandActionPublicKey: string
  setupActionName: string
  verifyActionName: string
}

let config: Config | undefined = undefined

const validationSchema = yup.object({
  loglevel: yup.string().optional().default('debug'),
  appUrl: yup.string().required(),
  appName: yup.string().required(),
  appDescription: yup.string().required(),
  dbUrl: yup.string().required(),
  skipVerification: yup.boolean().optional().default(false),
  collablandActionPublicKey: yup.string().required(),
  setupActionName: yup.string().optional().default(DEFAULT_SETUP_ACTION_NAME),
  verifyActionName: yup.string().optional().default(DEFAULT_VERIFY_ACTION_NAME),
})

const loadConfiguration = (): Config => {
  /* eslint-disable prettier/prettier */
  config = {
    // static
    appName: 'Rarimo Proof of Humanity Verify Page',
    appDescription: "Verify Discord server's members humanity using the Rarimo Proof of Humanity case and Collab.land bot.",

    // configurable
    loglevel: env(process.env.NEXT_PUBLIC_LOG_LEVEL),
    appUrl: env(process.env.NEXT_PUBLIC_APP_URL),
    dbUrl: env(process.env.NEXT_PUBLIC_DB_URL),
    skipVerification: Boolean(process.env.NEXT_PUBLIC_SKIP_VERIFICATION),
    collablandActionPublicKey: env(process.env.NEXT_PUBLIC_COLLABLAND_PUBLIC_KEY),
    setupActionName: env(process.env.NEXT_PUBLIC_SETUP_ACTION_NAME),
    verifyActionName: env(process.env.NEXT_PUBLIC_VERIFY_ACTION_NAME),
  }
  /* eslint-enable prettier/prettier */

  return validationSchema.validateSync(config, {
    strict: true,
    abortEarly: true,
  })
}

export const CONFIG: Config = config ?? loadConfiguration()

export const METADATA: Metadata = {
  metadataBase: new URL(CONFIG.appUrl),
  description: CONFIG.appDescription,
  applicationName: CONFIG.appName,
  title: CONFIG.appName,
  themeColor: '#ffffff',
  colorScheme: 'light',
  // eslint-disable-next-line prettier/prettier
  viewport: 'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0',
  creator: 'Zero Block Global Foundation',
  openGraph: {
    title: CONFIG.appName,
    description: CONFIG.appDescription,
    locale: 'en_GB',
    type: 'website',
    images: '/thumbnail.jpg',
  },
  twitter: {
    description: CONFIG.appDescription,
    title: CONFIG.appName,
    card: 'summary_large_image',
    images: '/thumbnail.jpg',
  },
}
