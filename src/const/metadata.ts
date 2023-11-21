import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  DiscordActionMetadata,
  InteractionType,
} from '@collabland/discord'
import { MiniAppManifest } from '@collabland/models'
import { join } from 'path'

import PackageJson from '@/../package.json'
import { serverConfig } from '@/config/server'

import { SETUP_ACTION_OPTION_NAME } from './actions'

const keywords = ['verification', 'rarimo', 'proof-of-humanity']

const appIcon = {
  label: 'Rarimo Proof of Humanity Action',
  src: join(serverConfig.appUrl, '/apple-icon.png'),
  sizes: '186x186',
}

const manifest = new MiniAppManifest({
  appId: PackageJson.name,
  name: 'Rarimo Proof of Humanity Verify Action',
  shortName: 'rarimo-poh-action',
  appType: 'action',
  developer: PackageJson.author,
  description: serverConfig.appDescription,
  shortDescription: serverConfig.appDescription,
  platforms: ['discord'],
  version: { name: PackageJson.version },
  website: serverConfig.appUrl,
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
      // Handle setup slash command
      type: InteractionType.ApplicationCommand,
      names: [serverConfig.setupActionName],
    },
    {
      // Handle verify <role> slash command
      type: InteractionType.ApplicationCommand,
      names: [serverConfig.verifyActionName],
    },
  ],
  /**
   * Supported Discord application commands. They will be registered to a
   * Discord guild upon installation.
   */
  applicationCommands: [
    // setup slash command
    {
      metadata: {
        name: 'Setup Rarimo Proof of Humanity Verify Action',
        shortName: serverConfig.setupActionName,
        supportedEnvs: ['production', 'development'],
      },
      name: serverConfig.setupActionName,
      type: ApplicationCommandType.ChatInput,
      description: 'Allows you to setup Rarimo Proof of Humanity Verify Action',
      options: [
        {
          name: SETUP_ACTION_OPTION_NAME,
          description: 'Select the verified role',
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
    },
    // verify slash command
    {
      metadata: {
        name: 'Verify your humanity with Rarimo Proof of Humanity use case',
        shortName: serverConfig.verifyActionName,
        supportedEnvs: ['production', 'development'],
      },
      name: serverConfig.verifyActionName,
      type: ApplicationCommandType.ChatInput,
      description: 'Allows you to verify your humanity with Rarimo Proof of Humanity use case',
      options: [],
    },
  ],

  requiredContext: ['isCommunityAdmin', 'guildName'],
}
