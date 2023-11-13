import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'
import * as yup from 'yup'

type Config = {
  port: number
  host: string
  publicKey: string
  loglevel: string
}

let config: Config | undefined = undefined

const validationSchema = yup.object({
  loglevel: yup.string().optional().default('debug'),
  port: yup.number().optional().default(3000),
  host: yup.string().optional().default(''),
  publicKey: yup.string().required(),
})

const loadConfiguration = (): Config => {
  config = yaml.load(readFileSync(join(process.env.CONFIG_FILE || 'config.yaml'), 'utf8')) as Config

  return validationSchema.validateSync(config, {
    strict: true,
    abortEarly: true,
  })
}

export const CONFIG: Config = config ?? loadConfiguration()
