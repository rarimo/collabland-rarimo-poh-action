import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { Components } from '@mui/material'

import { BaseTheme } from '@/types'

const MEDIUM_BUTTON_SX = {
  height: 40,
  padding: '8px 16px',
  fontSize: 14,
  lineHeight: 1.73,
}

export const COMPONENTS: Components<BaseTheme> = {
  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.57,
        color: theme.palette.text.primary,
        textDecorationStyle: 'dotted',
        textDecorationColor: theme.palette.text.disabled,
        textUnderlineOffset: 3,
        textDecorationThickness: 1,
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },
    styleOverrides: {
      root: {
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        boxShadow: 'unset',

        '&.Mui-disabled': {
          cursor: 'not-allowed',
          pointerEvents: 'unset',
        },

        '&:hover': {
          boxShadow: 'unset',
        },
      },
      outlinedSizeMedium: {
        ...MEDIUM_BUTTON_SX,
      },
      containedSizeMedium: {
        ...MEDIUM_BUTTON_SX,
      },
      textSizeMedium: {
        ...MEDIUM_BUTTON_SX,
      },
      containedSizeLarge: {
        height: 48,
        padding: '11px 22px',
      },
      containedSizeSmall: {
        height: 32,
        minWidth: 'auto',
        padding: '10px 7px',
        fontSize: 13,
        lineHeight: 1.7,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'unset',
        boxShadow: 'unset',
      },
    },
  },
  MuiSkeleton: {
    defaultProps: {
      animation: 'wave',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        transform: 'none',
        borderRadius: 0,
        backgroundColor: theme.palette.action.hover,
      }),
    },
  },
  MuiFormControl: {
    defaultProps: {
      fullWidth: true,
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: {
        width: 20,
        height: 20,
        pointerEvents: 'none',
        top: 18,
      },
    },
    defaultProps: {
      IconComponent: KeyboardArrowDownOutlinedIcon,
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        caretColor: 'var(--col-primary-main)',
        '& > input::placeholder, & > input::-webkit-input-placeholder': {
          color: 'var(--col-txt-focus-visible)',
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        maxWidth: 300,
        borderRadius: 0,
      },
      popper: {
        '&[data-popper-placement*="bottom"]': {
          '& > .MuiTooltip-tooltip': {
            marginTop: 4,
          },
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderColor: 'var(--col-divider)',
      },
      head: {
        background: 'transparent',
        textTransform: 'uppercase',
        fontSize: 12,
        lineHeight: 2,
        fontWeight: 700,
        color: 'var(--col-txt-secondary)',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 1.38,
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        '& > .MuiTabs-scroller > .MuiTabs-flexContainer': {
          height: 64,

          '& > .MuiTab-root': {
            textTransform: 'uppercase',
          },
        },
      },
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        bgcolor: 'rgba(0, 0, 0, 0.87)',
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        color: 'var(--col-txt-secondary)',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        marginTop: '16px',
        padding: '8px 0',
        backgroundColor: 'var(--ui-paper-elevation-8)',
      },
    },
  },
}
