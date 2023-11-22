import { Chain, ChainId } from '@distributedlab/w3p'

export type SharedConfig = {
  appUrl: string
  appName: string
  appDescription: string
  collablandClientId: string
  collablandApiUrl: string
  env: 'devnet' | 'mainnet'
  targetChainId: ChainId
}

export type ServerConfig = SharedConfig & {
  loglevel: string
  dbUrl: string
  skipVerification: boolean
  collablandClientSecret: string
  collablandApiKey: string
  collablandEcdsaPublicKey: string
  collablandEd25519PublicKeyHex: string
  setupActionName: string
  verifyActionName: string
  sbtContractAddress: string
}

export type ClientConfig = SharedConfig & {
  supportedChains: Chain[]
  pohAppUrl: string
}
