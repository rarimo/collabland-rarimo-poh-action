import * as yup from 'yup'

type Config = {
  loglevel: string
  skipVerification: boolean
  appUrl: string
  pohAppUrl: string
  collablandEcdsaPublicKey: string
  collablandEd25519PublicKeyHex: string
}

const validationSchema = yup.object({
  loglevel: yup.string().optional().default('debug'),
  skipVerification: yup.boolean().required(),
  collablandEcdsaPublicKey: yup.string().required(),
  collablandEd25519PublicKeyHex: yup.string().required(),
  pohAppUrl: yup.string().required(),
  appUrl: yup.string().required(),
})

const loadCfg = (): Config => {
  const skipVerification = process.env.SKIP_VERIFICATION

  const config = validationSchema.cast({
    loglevel: process.env.LOG_LEVEL,
    skipVerification: skipVerification ? skipVerification === 'true' : false,
    collablandEcdsaPublicKey: process.env.COLLABLAND_ECDSA_PUBLIC_KEY,
    collablandEd25519PublicKeyHex: process.env.COLLABLAND_ED25519_PUBLIC_KEY_HEX,
    pohAppUrl: process.env.POH_APP_URL,
    appUrl: process.env.APPLICATION_URL,
  })

  return validationSchema.validateSync(config, {
    strict: true,
    abortEarly: true,
  })
}

export const config = loadCfg()
