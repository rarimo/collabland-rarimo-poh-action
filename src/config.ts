import { Metadata } from 'next'
import * as yup from 'yup'

const env = (value?: string): string => value ?? ''

type Config = {
  appUrl: string
  appName: string
  appDescription: string
  loglevel: string
  dbUrl: string
}

let config: Config | undefined = undefined

const validationSchema = yup.object({
  loglevel: yup.string().optional().default('debug'),
  appUrl: yup.string().required(),
  appName: yup.string().required(),
  appDescription: yup.string().required(),
  dbUrl: yup.string().required(),
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
    images: '/preview-card.jpg',
  },
  twitter: {
    description: CONFIG.appDescription,
    title: CONFIG.appName,
    card: 'summary_large_image',
    images: '/preview-card.jpg',
  },
}
