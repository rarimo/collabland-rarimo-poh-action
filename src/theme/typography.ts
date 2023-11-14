// eslint-disable-next-line no-restricted-imports
import { TypographyOptions } from '@mui/material/styles/createTypography'

import { TYPOGRAPHY } from '@/theme/variables'

export const TYPOGRAPHY_THEME: TypographyOptions = {
  htmlFontSize: 16,
  fontFamily: TYPOGRAPHY.txtFontFamily,
  fontSize: Number(TYPOGRAPHY.txtFontSizeRegular),
  fontWeightLight: TYPOGRAPHY.txtFontWeightLight,
  fontWeightRegular: TYPOGRAPHY.txtFontWeightRegular,
  fontWeightMedium: TYPOGRAPHY.txtFontWeightMedium,
  fontWeightBold: TYPOGRAPHY.txtFontWeightBold,
  h1: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightH1,
    fontSize: TYPOGRAPHY.txtFontSizeH1,
    lineHeight: TYPOGRAPHY.txtFontLineHeightH1,
  },
  h2: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightH2,
    fontSize: TYPOGRAPHY.txtFontSizeH2,
    lineHeight: TYPOGRAPHY.txtFontLineHeightH2,
  },
  h3: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightH3,
    fontSize: TYPOGRAPHY.txtFontSizeH3,
    lineHeight: TYPOGRAPHY.txtFontLineHeightH3,
  },
  h4: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightH4,
    fontSize: TYPOGRAPHY.txtFontSizeH4,
    lineHeight: TYPOGRAPHY.txtFontLineHeightH4,
  },
  h5: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightH5,
    fontSize: TYPOGRAPHY.txtFontSizeH5,
    lineHeight: TYPOGRAPHY.txtFontLineHeightH5,
  },
  h6: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightH6,
    fontSize: TYPOGRAPHY.txtFontSizeH6,
    lineHeight: TYPOGRAPHY.txtFontLineHeightH6,
  },
  subtitle1: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightSubtitle1,
    fontSize: TYPOGRAPHY.txtFontSizeSubtitle1,
    lineHeight: TYPOGRAPHY.txtFontLineHeightSubtitle1,
  },
  subtitle2: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightSubtitle2,
    fontSize: TYPOGRAPHY.txtFontSizeSubtitle2,
    lineHeight: TYPOGRAPHY.txtFontLineHeightSubtitle2,
  },
  body1: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightBody1,
    fontSize: TYPOGRAPHY.txtFontSizeBody1,
    lineHeight: TYPOGRAPHY.txtFontLineHeightBody1,
  },
  body2: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightBody2,
    fontSize: TYPOGRAPHY.txtFontSizeBody2,
    lineHeight: TYPOGRAPHY.txtFontLineHeightBody2,
  },
  button: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightButton,
    fontSize: TYPOGRAPHY.txtFontSizeButton,
    lineHeight: TYPOGRAPHY.txtFontLineHeightButton,
    textTransform: 'none',
  },
  caption: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightCaption,
    fontSize: TYPOGRAPHY.txtFontSizeCaption,
    lineHeight: TYPOGRAPHY.txtFontLineHeightCaption,
  },
  overline: {
    fontFamily: TYPOGRAPHY.txtFontFamily,
    fontWeight: TYPOGRAPHY.txtFontWeightOverline,
    fontSize: TYPOGRAPHY.txtFontSizeOverline,
    lineHeight: TYPOGRAPHY.txtFontLineHeightOverline,
  },
}
