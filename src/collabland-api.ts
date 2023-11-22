import { Fetcher } from '@distributedlab/fetcher'

import { serverConfig } from '@/config/server'

export const collablandApi = new Fetcher({
  baseUrl: serverConfig.collablandApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})
