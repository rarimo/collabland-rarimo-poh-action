import * as yup from 'yup'

export const sharedValidationSchema = {
  appUrl: yup.string().required(),
  appName: yup.string().required(),
  appDescription: yup.string().required(),
  collablandClientId: yup.string().required(),
  collablandApiUrl: yup.string().required(),
  env: yup.string().oneOf(['devnet', 'mainnet']).required(),
}
