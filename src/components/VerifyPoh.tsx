import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import { Button, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useMemo, useState } from 'react'
import { useLocalStorage } from 'react-use'

import { api } from '@/api'
import { clientConfig } from '@/config/client'
import { WEB3_STORAGE_KEY } from '@/const'
import { ErrorHandler } from '@/helpers/error-handler'
import { go } from '@/helpers/go'
import { useI18n } from '@/locales/client'
import { Web3StorageState } from '@/types'

import Dialog from './Dialog/Dialog'

const ICON_SIZE = 100

const ICON_SX = {
  height: ICON_SIZE,
  width: ICON_SIZE,
  minWidth: ICON_SIZE,
  minHeight: ICON_SIZE,
  color: 'var(--col-action-active)',
}

export default function VerifyPoh({
  guildId,
  isDialogOpened,
  closeDialog,
}: {
  guildId: string
  isDialogOpened: boolean
  closeDialog: () => void
}) {
  const [web3StorageState] = useLocalStorage<Web3StorageState>(WEB3_STORAGE_KEY)
  const [grant, setGrant] = useState<{ granted: boolean } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const t = useI18n()

  const isVerified = useMemo(() => grant?.granted || false, [grant])

  const icon = useMemo(() => {
    return isVerified ? (
      <CheckCircleOutlineOutlinedIcon sx={{ ...ICON_SX, color: 'var(--col-primary-main)' }} />
    ) : (
      <PermIdentityOutlinedIcon sx={ICON_SX} />
    )
  }, [isVerified])

  const tipText = useMemo(() => {
    if (grant) {
      return isVerified ? t('verify-poh.tip-verified-text') : t('verify-poh.tip-not-verified-text')
    }
    return t('verify-poh.tip-text')
  }, [grant, isVerified, t])

  const actions = useMemo(() => {
    const checkPoh = async () => {
      setIsLoading(true)
      setGrant(null)

      const [err, resp] = await go(() =>
        api.get<{ granted: boolean }>('/user/poh', {
          query: { address: web3StorageState?.address ?? '', guildId },
        }),
      )

      if (err) {
        ErrorHandler.processWithoutFeedback(err)
        setIsLoading(false)
        return
      }

      setIsLoading(false)
      setGrant(resp?.data ?? null)
    }

    return [
      <Stack direction='row' spacing={2} key='actions-stack'>
        <Button
          variant={isVerified ? 'contained' : 'text'}
          size='medium'
          onClick={closeDialog}
          disabled={isLoading}
        >
          {isVerified ? t('common.close-btn') : t('common.cancel-btn')}
        </Button>
        {!isVerified && (
          <Button
            variant='contained'
            type='button'
            size='medium'
            onClick={checkPoh}
            disabled={isLoading}
          >
            {t('verify-poh.check-btn-lbl')}
          </Button>
        )}
        {!isVerified && grant && (
          <Button
            variant='contained'
            type='button'
            size='medium'
            href={clientConfig.pohAppUrl}
            target='_blank'
            disabled={isLoading}
          >
            {t('verify-poh.verify-btn-lbl')}
          </Button>
        )}
      </Stack>,
    ]
  }, [isVerified, closeDialog, isLoading, t, grant, web3StorageState?.address, guildId])

  return (
    <Dialog
      action={actions}
      onClose={closeDialog}
      isOpened={isDialogOpened}
      title={t('verify-poh.dialog-heading')}
    >
      <Stack
        spacing={3}
        alignItems='center'
        justifyContent='center'
        sx={{
          mt: 3,
        }}
      >
        {icon}
        <Typography
          variant={'body2'}
          color={isVerified ? 'var(--col-primary-main)' : 'var(--col-txt-secondary)'}
        >
          {tipText}
        </Typography>
      </Stack>
    </Dialog>
  )
}
