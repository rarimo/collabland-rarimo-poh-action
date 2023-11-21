import { Chain, ChainId } from '@distributedlab/w3p'

export type SharedConfig = {
  appUrl: string
  appName: string
  appDescription: string
  collablandClientId: string
}

export type ServerConfig = SharedConfig & {
  loglevel: string
  dbUrl: string
  skipVerification: boolean
  collablandClientSecret: string
  collablandClientApiKey: string
  collablandEcdsaPublicKey: string
  collablandEd25519PublicKeyHex: string
  setupActionName: string
  verifyActionName: string
}

export type ClientConfig = SharedConfig & {
  targetChainId: ChainId
  supportedChains: Chain[]
  env: 'devnet' | 'mainnet'
}
