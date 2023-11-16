import { MiniAppManifest } from '@collabland/models'
import { join } from 'path'

import { CONFIG } from '@/config'

import PackageJson from '../../package.json'

const keywords = ['verification', 'rarimo', 'proof-of-humanity']

const appIcon = {
  label: 'Rarimo Proof of Humanity Action',
  src: join(CONFIG.appUrl, '/apple-icon.png'),
  sizes: '186x186',
}

export const MANIFEST = new MiniAppManifest({
  appId: 'collabland-rarimo-poh-action',
  name: 'Rarimo Proof of Humanity Verify Action',
  shortName: 'rarimo-poh-action',
  appType: 'action',
  developer: 'Zero Block Global Foundation',
  description: CONFIG.appDescription,
  shortDescription: CONFIG.appDescription,
  platforms: ['discord'],
  version: { name: PackageJson.version },
  website: CONFIG.appUrl,
  keywords,
  tags: keywords,
  thumbnails: [appIcon],
  icons: [appIcon],
})
