import * as yup from 'yup'

export const sharedValidationSchema = {
  appUrl: yup.string().required(),
  appName: yup.string().required(),
  appDescription: yup.string().required(),
  collablandClientId: yup.string().required(),
}
