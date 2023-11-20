import { Fetcher } from '@distributedlab/fetcher'

import { config } from '@/config'

export const api = new Fetcher({
  baseUrl: config.appUrl,
})
