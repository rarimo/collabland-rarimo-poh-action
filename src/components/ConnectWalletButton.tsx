'use client'

import {
  errors,
  Provider,
  ProviderDetector,
  ProviderProxyConstructor,
  PROVIDERS,
} from '@distributedlab/w3p'
import Button from '@mui/material/Button'
import { utils } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'react-use'

import packageJson from '@/../package.json'
import { api } from '@/api'
import { clientConfig } from '@/config/client'
import { SALT_BYTES, SUPPORTED_PROVIDERS_MAP, WEB3_STORAGE_KEY } from '@/const'
import { ErrorHandler } from '@/helpers/error-handler'
import { Bus } from '@/helpers/event-bus'
import { go } from '@/helpers/go'
import { hashMessage } from '@/helpers/hash-msg'
import { useDialog, useProvider } from '@/hooks'
import { useI18n } from '@/locales/client'
import { SUPPORTED_PROVIDERS, Web3StorageState } from '@/types'

import { DialogFormWrapper } from './Dialog'
import WalletForm from './WalletForm'

const CONNECT_FORM_ID = 'connect-form'

export default function ConnectWalletButton() {
  const [isVerified, setIsVerified] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const t = useI18n()
  const provider = useProvider()
  const providerDetector = useMemo(() => new ProviderDetector<PROVIDERS>(), [])

  const { closeDialog, openDialog, setIsDisabled, isDisabled, isDialogOpened } = useDialog()

  const [storageState, setStorageState, removeStorageState] = useLocalStorage<Web3StorageState>(
    WEB3_STORAGE_KEY,
    {
      providerType: undefined,
      address: undefined,
      verified: false,
    },
  )

  const disconnect = useCallback(async () => {
    await go(provider?.disconnect)
    removeStorageState()
  }, [provider, removeStorageState])

  const processError = useCallback(
    async (err: unknown) => {
      if (err instanceof Error) {
        if (!(err instanceof errors.ProviderResourceUnavailable)) {
          ErrorHandler.process(err)
        }

        if (err instanceof errors.ProviderUserRejectedRequest) {
          await disconnect()
        }
      }
    },
    [disconnect],
  )

  const listeners = useMemo(
    () => ({
      onDisconnect: disconnect,
    }),
    [disconnect],
  )

  const connect = useCallback(
    async (providerType?: SUPPORTED_PROVIDERS) => {
      if (isInitialized || isConnecting) return
      setIsInitialized(false)

      const currentProvider = providerType ?? storageState?.providerType

      if (!currentProvider) return

      setIsConnected(false)
      setIsConnecting(true)

      Provider.setChainsDetails(
        Object.entries(clientConfig.supportedChains).reduce(
          (acc, [, chainDetails]) => ({
            ...acc,
            [chainDetails.id]: chainDetails,
          }),
          {},
        ),
      )

      let initializedProvider: Provider = {} as Provider

      const [err] = await go(async () => {
        setStorageState({
          ...storageState,
          providerType: currentProvider,
        })

        await providerDetector.init()

        initializedProvider = await provider.init(
          SUPPORTED_PROVIDERS_MAP[currentProvider] as ProviderProxyConstructor,
          {
            providerDetector,
            listeners,
          },
        )

        if (!initializedProvider.isConnected) await initializedProvider?.connect?.()

        if (initializedProvider.chainDetails?.id !== clientConfig.targetChainId) {
          await initializedProvider?.switchChain?.(clientConfig.targetChainId)
        }
      })

      await processError(err)
    },
    [
      isInitialized,
      isConnecting,
      storageState,
      processError,
      setStorageState,
      providerDetector,
      provider,
      listeners,
    ],
  )

  const label = useMemo(() => {
    if (isConnected && isVerified) return t('connect-wallet-btn.btn-connected-lbl')
    if (isConnecting) return t('connect-wallet-btn.btn-connecting-lbl')
    return t('connect-wallet-btn.btn-lbl')
  }, [isVerified, isConnected, isConnecting, t])

  useEffect(() => {
    const continueConnect = async () => {
      const [err] = await go(async () => {
        setIsConnected(provider?.isConnected ?? false)
        closeDialog()

        if (!provider.isConnected) throw TypeError('Wallet should be connected')
        if (storageState?.verified) {
          setIsVerified(true)
          return
        }

        const message = hashMessage({
          salt: utils.hexlify(utils.randomBytes(SALT_BYTES)),
          domain: window.location.hostname,
          address: provider.address!,
          version: packageJson.version,
          chainId: clientConfig.targetChainId,
        })

        const signature = await provider.signMessage(message)

        const { data } = await api.post<{ verified: boolean }>('/verify-signature', {
          body: {
            message,
            signature,
            address: provider.address,
          },
        })

        setIsVerified(data?.verified ?? false)

        setStorageState({
          ...storageState,
          verified: data?.verified ?? false,
          address: provider.address,
          providerType: storageState?.providerType,
        })

        Bus.emit(Bus.eventList.verified, data?.verified ?? false)
      })

      await processError(err)

      if (provider?.isConnected && provider?.address) setIsInitialized(true)
      setIsConnecting(false)
    }

    if (!isConnected && !isVerified && provider.isConnected) {
      continueConnect()
    }
  }, [
    processError,
    provider,
    closeDialog,
    storageState,
    setStorageState,
    isConnecting,
    isConnected,
    isInitialized,
    isVerified,
  ])

  useEffect(() => {
    connect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Button
        size={'large'}
        onClick={openDialog}
        disabled={isDisabled || isVerified || isConnecting}
      >
        {label}
      </Button>
      <DialogFormWrapper
        formId={CONNECT_FORM_ID}
        isDisabled={isDisabled}
        isDialogOpened={isDialogOpened}
        closeDialog={closeDialog}
        actionBtnText={t('connect-wallet-btn.connect-btn-lbl')}
        title={t('connect-wallet-btn.dialog-heading')}
      >
        <WalletForm id={CONNECT_FORM_ID} connect={connect} setIsDialogDisabled={setIsDisabled} />
      </DialogFormWrapper>
    </>
  )
}
