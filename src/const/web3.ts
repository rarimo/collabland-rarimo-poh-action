import {
  CHAIN_TYPES,
  CoinbaseProvider,
  IProvider,
  MetamaskProvider,
  ProviderProxyConstructor,
  PROVIDERS,
} from '@distributedlab/w3p'

import { SUPPORTED_PROVIDERS } from '@/types'

// TODO: add walletconnect
export const SUPPORTED_PROVIDERS_MAP: {
  [key in SUPPORTED_PROVIDERS]?: ProviderProxyConstructor
} = {
  [PROVIDERS.Metamask]: MetamaskProvider,
  [PROVIDERS.Coinbase]: CoinbaseProvider,
}

export const PROVIDER_EVENTS: Array<keyof IProvider> = [
  'onInitiated',
  'onConnect',
  'onAccountChanged',
  'onChainChanged',
  'onDisconnect',
]

export const POLYGON_CHAIN_ID = 137
export const GOERLI_CHAIN_ID = 5

export const SUPPORTED_CHAINS_MAINNET = [
  {
    id: POLYGON_CHAIN_ID,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com/',
    explorerUrl: 'https://polygonscan.com',
    token: {
      name: 'Polygon MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    type: CHAIN_TYPES.EVM,
    icon: 'https://raw.githubusercontent.com/rarimo/js-sdk/1.5.0/assets/logos/matic-logo.png',
  },
]

export const SUPPORTED_CHAINS_DEVNET = [
  {
    id: GOERLI_CHAIN_ID,
    name: 'Goerli',
    rpcUrl: 'https://goerli.infura.io/v3/',
    explorerUrl: 'https://goerli.etherscan.io',
    token: {
      name: 'Goerli Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    type: CHAIN_TYPES.EVM,
    icon: 'https://raw.githubusercontent.com/rarimo/js-sdk/1.5.0/assets/logos/eth-logo.png',
  },
]

export const SALT_BYTES = 32
