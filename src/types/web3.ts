import { ChainId, PROVIDERS } from '@distributedlab/w3p'

export type SUPPORTED_PROVIDERS = PROVIDERS

export type Message = {
  salt: string
  domain: string
  address: string
  version: string
  chainId: ChainId
}
