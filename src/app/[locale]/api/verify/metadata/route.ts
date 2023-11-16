import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  DiscordActionMetadata,
  InteractionType,
} from '@collabland/discord'

import { MANIFEST, SETUP_ACTION_NAME, SETUP_ACTION_OPTION_NAME, VERIFY_ACTION_NAME } from '@/const'

export const GET = () => {
  const metadata: DiscordActionMetadata = {
    /**
     * Miniapp manifest
     */
    manifest: MANIFEST,
    /**
     * Supported Discord interactions. They allow Collab.Land to route Discord
     * interactions based on the type and name/custom-id.
     */
    supportedInteractions: [
      {
        // Handle `/setup` slash command
        type: InteractionType.ApplicationCommand,
        names: ['setup'],
      },
      {
        // Handle `/verify <role>` slash command
        type: InteractionType.ApplicationCommand,
        names: ['verify'],
      },
    ],
    /**
     * Supported Discord application commands. They will be registered to a
     * Discord guild upon installation.
     */
    applicationCommands: [
      // `/setup` slash command
      {
        metadata: {
          name: 'Setup Rarimo Proof of Humanity Verify Action',
          shortName: SETUP_ACTION_NAME,
          supportedEnvs: ['production', 'development'],
        },
        name: SETUP_ACTION_NAME,
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
      // `/verify` slash command
      {
        metadata: {
          name: 'Verify your humanity with Rarimo Proof of Humanity use case',
          shortName: VERIFY_ACTION_NAME,
          supportedEnvs: ['production', 'development'],
        },
        name: VERIFY_ACTION_NAME,
        type: ApplicationCommandType.ChatInput,
        description: 'Allows you to verify your humanity with Rarimo Proof of Humanity use case',
        options: [],
      },
    ],
  }

  return Response.json(metadata)
}
