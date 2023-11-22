'use client'

import Button from '@mui/material/Button'
import { useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'react-use'

import { api } from '@/api'
import { clientConfig } from '@/config/client'
import { DISCORD_STORAGE_KEY, WEB3_STORAGE_KEY } from '@/const'
import { ErrorHandler } from '@/helpers/error-handler'
import { Bus } from '@/helpers/event-bus'
import { go } from '@/helpers/go'
import { useI18n } from '@/locales/client'
import { DiscordStorageState, Web3StorageState } from '@/types'

export default function LoginDiscordButton({ guildId, code }: { guildId: string; code?: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  const t = useI18n()

  const [web3StorageState] = useLocalStorage<Web3StorageState>(WEB3_STORAGE_KEY)

  const [discordStorageState, setDiscordStorageState] = useLocalStorage<DiscordStorageState>(
    DISCORD_STORAGE_KEY,
    {
      [guildId]: undefined,
    },
  )

  const loginUrl = useMemo(() => {
    const query = {
      client_id: clientConfig.collablandClientId,
      response_type: 'code',
      redirect_uri: clientConfig.appUrl,
      scope: '$public',
      state: guildId,
    }

    const url = new URL(clientConfig.collablandApiUrl)
    url.pathname = '/oauth2/authorize'

    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    return url.toString()
  }, [guildId])

  const label = useMemo(() => {
    if (isLoading) return t('login-discord-btn.btn-processing-lbl')
    if (isLogged) return t('login-discord-btn.btn-logged-in-lbl')
    return t('login-discord-btn.btn-lbl')
  }, [isLoading, isLogged, t])

  useEffect(() => {
    setIsDisabled(!web3StorageState?.verified)
  }, [web3StorageState, setIsDisabled])

  useEffect(() => {
    setIsLogged(Boolean(discordStorageState?.[guildId]))
  }, [discordStorageState, guildId, setIsLogged])

  useEffect(() => {
    Bus.on<{ verified: boolean }>(Bus.eventList.verified, ({ verified }) => {
      setIsDisabled(!verified)
    })

    const login = async () => {
      if (!code) return
      if (isLoading) return

      setIsLoading(true)

      const [err, resp] = await go(() =>
        api.get<{ id: string }>('/user/discord', {
          query: { code },
        }),
      )
      if (err) {
        ErrorHandler.processWithoutFeedback(err)
        setIsLoading(false)
        return
      }

      const id = resp?.data?.id

      setDiscordStorageState({ [guildId]: id })
      setIsLoading(false)
      Bus.emit(Bus.eventList.discordLoggedIn, Boolean(id))
    }

    if (!discordStorageState?.[guildId] && code && !isLoading) {
      login()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Button
      component='a'
      size={'large'}
      disabled={isDisabled || isLoading || isLogged}
      href={loginUrl}
    >
      {label}
    </Button>
  )
}
