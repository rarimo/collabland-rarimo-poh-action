import CheckIcon from '@mui/icons-material/Check'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import InfoIcon from '@mui/icons-material/Info'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { AlertColor, SnackbarOrigin, useTheme } from '@mui/material'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Snackbar from '@mui/material/Snackbar'
import { Theme } from '@mui/material/styles'
import { OverridableStringUnion } from '@mui/types'
import { SyntheticEvent, useMemo } from 'react'

import { useI18n } from '@/locales/client'

const getIconBySeverity = (theme: Theme, severity: AlertColor) => {
  const color = theme.palette[severity].dark as OverridableStringUnion<AlertColor>

  const iconProps = {
    'aria-hidden': true,
    color,
  }

  return {
    error: <ErrorOutlineIcon {...iconProps} />,
    info: <InfoIcon {...iconProps} />,
    success: <CheckIcon {...iconProps} />,
    warning: <WarningAmberIcon {...iconProps} />,
  }[severity]
}

export default function SnackbarInfo({
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  autoHideDuration = 5000,
  isOpened,
  message,
  close,
  severity = 'info',
}: {
  anchorOrigin?: SnackbarOrigin
  autoHideDuration?: number
  isOpened: boolean
  message: string
  close?: () => void
  severity: AlertColor
}) {
  const t = useI18n()
  const theme = useTheme()

  const icon = getIconBySeverity(theme, severity || 'info')

  const onClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    close && close()
  }

  // @ts-ignore
  const title = useMemo(() => {
    if (severity === 'error') return t('snackbar-info.title-error')
    if (severity === 'success') return t('snackbar-info.title-success')
    if (severity === 'warning') return t('snackbar-info.title-warning')
    if (severity === 'info') return t('snackbar-info.title-info')
  }, [severity, t])

  const topPadding = `calc(var(--ui-header-height) + ${theme.spacing(2)})`

  return (
    <Snackbar
      {...(anchorOrigin && { anchorOrigin })}
      {...(autoHideDuration && { autoHideDuration })}
      {...(close && { onClose })}
      open={isOpened}
      sx={{
        top: { xs: topPadding, md: topPadding },
        minWidth: { xs: '80vw', md: 400 },
        maxWidth: { xs: '80vw', md: 400 },
        '& > .MuiPaper-root': {
          border: `var(--ui-border)`,
        },
      }}
    >
      <Alert
        {...(close && { onClose })}
        sx={{
          width: '100%',
          '& > .MuiAlert-message': {
            wordBreak: 'break-word',
          },
        }}
        icon={icon}
        severity={severity}
        elevation={6}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  )
}
