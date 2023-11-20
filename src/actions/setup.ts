import {
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  DiscordActionRequest,
  getCommandOptionValue,
  InteractionResponseType,
  MessageFlags,
} from '@collabland/discord'

import { SETUP_ACTION_OPTION_NAME } from '@/const'
import { db } from '@/db'
import { go } from '@/helpers/go'
import { badRequest, internalError } from '@/http'

export const handleSetupAction = async (interaction: DiscordActionRequest) => {
  const isAdmin = interaction?.actionContext?.isCommunityAdmin ?? false

  if (!isAdmin) return badRequest('Only community admins can setup this action')

  const roleId =
    getCommandOptionValue(
      interaction as APIChatInputApplicationCommandInteraction,
      SETUP_ACTION_OPTION_NAME,
    ) ?? ''
  const guildId = interaction.guild_id ?? ''

  if (!roleId) return badRequest('Missing verified role ID')
  if (!guildId) return badRequest('Missing guild ID')

  const [err] = await go(() => db.verifiedRolesQ.set(guildId, roleId))

  if (err) return internalError('Failed to save verified role')

  const response: APIInteractionResponse = {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      flags: MessageFlags.Ephemeral,
      embeds: [
        {
          title: 'Rarimo Proof of Humanity',
          description: 'Verify Action has been setup successfully!',
          color: 1752220,
        },
      ],
    },
  }

  return Response.json(response)
}
