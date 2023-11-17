import { createLogger, format, transports } from 'winston'

import { CONFIG } from '@/config'

export const logger = createLogger({
  level: CONFIG.loglevel,
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: 'collabland-rarimo-poh-action' },
  transports: [new transports.Console()],
})
