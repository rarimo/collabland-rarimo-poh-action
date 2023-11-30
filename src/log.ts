import { createLogger, format, transports } from 'winston'

import { config } from './config'

export const logger = createLogger({
  level: config.loglevel,
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: 'collabland-rarimo-poh-action' },
  transports: [new transports.Console()],
})
