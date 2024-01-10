import { ApplicationCommandType, DiscordActionMetadata, InteractionType } from '@collabland/discord'
import { MiniAppManifest } from '@collabland/models'

import PackageJson from '@/../package.json'
import { config } from '@/config'

const keywords = ['verification', 'rarimo', 'proof-of-humanity']

const craftPublicImgUrl = (imgName: string): string => {
  return new URL(`/${imgName}`, config.appUrl).toString()
}

const manifest = new MiniAppManifest({
  appId: PackageJson.name,
  name: 'Rarimo Proof of Humanity Verify Action',
  shortName: 'rarimo-poh-action',
  appType: 'action',
  developer: PackageJson.author,
  description: "Repel the bots from your discord server using Rarimo's Proof of Humanity.",
  shortDescription: "Repel the bots from your discord server using Rarimo's Proof of Humanity.",
  platforms: ['discord'],
  version: { name: PackageJson.version },
  website: config.pohAppUrl,
  keywords,
  tags: keywords,
  thumbnails: [
    {
      label: 'Rarimo Proof of Humanity App',
      src: craftPublicImgUrl('thumbnail-robotornot.png'),
      sizes: '3576x1946',
    },
    {
      label: 'Verify Discord Action message',
      src: craftPublicImgUrl('thumbnail-discord-verify-msg.png'),
      sizes: '1338x1368',
    },
  ],
  icons: [
    {
      label: 'Rarimo Proof of Humanity Action',
      src: craftPublicImgUrl('logo.png'),
      sizes: '186x186',
    },
  ],
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
        name: 'Verify your humanity with Rarimo',
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
