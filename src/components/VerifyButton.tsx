'use client'

import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'

import VerifyPoh from '@/components/VerifyPoh'
import { DISCORD_STORAGE_KEY, WEB3_STORAGE_KEY } from '@/const'
import { Bus } from '@/helpers/event-bus'
import { useDialog } from '@/hooks'
import { useI18n } from '@/locales/client'
import { DiscordStorageState, Web3StorageState } from '@/types'

export default function VerifyButton({ guildId }: { guildId: string }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isDiscordLoggedIn, setIsDiscordLoggedIn] = useState(false)
  const [web3StorageState] = useLocalStorage<Web3StorageState>(WEB3_STORAGE_KEY)
  const [discordStorageState] = useLocalStorage<DiscordStorageState>(DISCORD_STORAGE_KEY)

  const t = useI18n()

  const { closeDialog, openDialog, isDialogOpened } = useDialog()

  useEffect(() => {
    Bus.on<{ verified: boolean; address: string }>(Bus.eventList.verified, ({ verified }) => {
      setIsWalletConnected(verified)
    })
    Bus.on<boolean>(Bus.eventList.discordLoggedIn, logged => {
      setIsDiscordLoggedIn(logged)
    })

    setIsWalletConnected(web3StorageState?.verified ?? false)
    setIsDiscordLoggedIn(Boolean(discordStorageState?.[guildId]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Button
        size={'large'}
        disabled={!isWalletConnected || !isDiscordLoggedIn}
        onClick={openDialog}
      >
        {t('verify-btn.btn-lbl')}
      </Button>
      <VerifyPoh isDialogOpened={isDialogOpened} guildId={guildId} closeDialog={closeDialog} />
    </>
  )
}
