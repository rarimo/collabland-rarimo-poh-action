import { ApplicationCommandType, DiscordActionMetadata, InteractionType } from '@collabland/discord'
import { MiniAppManifest } from '@collabland/models'

import PackageJson from '@/../package.json'
import { config } from '@/config'

const keywords = ['verification', 'rarimo', 'proof-of-humanity']

const appIcon = {
  label: 'Rarimo Proof of Humanity Action',
  src: new URL('/logo.png', config.appUrl).toString(),
  sizes: '186x186',
}

const manifest = new MiniAppManifest({
  appId: PackageJson.name,
  name: 'Proof of Humanity',
  shortName: 'rarimo-poh-action',
  appType: 'action',
  developer: PackageJson.author,
  descriqption: `
    Rarimo’s Proof-of-Humanity plug-in ensures that only verified humans are present either within a server or channel. It keeps the community server spam and scam free which saves mods’ time, improves the quality of conversation, and helps protect airdrops.
    The solution is uniquely robust, yet does not require users to reveal any personal details. Users can select between five identity providers to verify their humanity, and will receive a verifed human credential that they can use across Web3 for perks and exclusive access.
  `,
  shortDescription: 'Keep your server bot free using Rarimo’s Proof-of-Humanity plug-in',
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
