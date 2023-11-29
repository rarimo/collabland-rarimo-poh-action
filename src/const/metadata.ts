import { ApplicationCommandType, DiscordActionMetadata, InteractionType } from '@collabland/discord'
import { MiniAppManifest } from '@collabland/models'
import { join } from 'path'

import PackageJson from '@/../package.json'
import { config } from '@/config'

const keywords = ['verification', 'rarimo', 'proof-of-humanity']

const appIcon = {
  label: 'Rarimo Proof of Humanity Action',
  src: join(config.appUrl, '/apple-icon.png'),
  sizes: '186x186',
}

const manifest = new MiniAppManifest({
  appId: PackageJson.name,
  name: 'Rarimo Proof of Humanity Verify Action',
  shortName: 'rarimo-poh-action',
  appType: 'action',
  developer: PackageJson.author,
  description:
    "Verify Discord server's members humanity using the Rarimo Proof of Humanity case and Collab.land bot.",
  shortDescription:
    "Verify Discord server's members humanity using the Rarimo Proof of Humanity case and Collab.land bot.",
  platforms: ['discord'],
  version: { name: PackageJson.version },
  website: config.pohAppUrl,
  keywords,
  tags: keywords,
  thumbnails: [appIcon],
  icons: [appIcon],
})

export const METADATA: DiscordActionMetadata = {
  /**
   * Miniapp manifest
   */
  manifest,
  /**
   * Supported Discord interactions. They allow Collab.Land to route Discord
   * interactions based on the type and name/custom-id.
   */
  supportedInteractions: [
    {
      // Handle verify <role> slash command
      type: InteractionType.ApplicationCommand,
      names: ['verify'],
    },
  ],
  /**
   * Supported Discord application commands. They will be registered to a
   * Discord guild upon installation.
   */
  applicationCommands: [
    {
      metadata: {
        name: 'Verify your humanity with Rarimo Proof of Humanity use case',
        shortName: 'verify',
        supportedEnvs: ['production', 'development'],
      },
      name: 'verify',
      type: ApplicationCommandType.ChatInput,
      description: 'Allows you to verify your humanity with Rarimo Proof of Humanity use case',
      options: [],
    },
  ],

  requiredContext: ['isCommunityAdmin', 'guildName'],
}
