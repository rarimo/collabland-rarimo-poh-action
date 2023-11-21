import { createLogger, format, transports } from 'winston'

import { serverConfig } from '@/config/server'

export const logger = createLogger({
  level: serverConfig.loglevel,
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: 'collabland-rarimo-poh-action' },
  transports: [new transports.Console()],
})
