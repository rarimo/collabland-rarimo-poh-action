import { SUPPORTED_PROVIDERS } from './web3'

export type Web3StorageState = {
  providerType?: SUPPORTED_PROVIDERS
  address?: string
  verified?: boolean
}

export type DiscordStorageState = {
  [key: string]: string | undefined
}
