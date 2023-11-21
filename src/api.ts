import { Fetcher } from '@distributedlab/fetcher'

import { clientConfig } from '@/config/client'

const baseUrl = new URL(clientConfig.appUrl)
baseUrl.pathname = '/api'

export const api = new Fetcher({
  baseUrl: baseUrl.toString(),
})
