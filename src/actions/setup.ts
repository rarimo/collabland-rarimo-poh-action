import {
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  getCommandOptionValue,
  InteractionResponseType,
  MessageFlags,
} from '@collabland/discord'

import { SETUP_ACTION_OPTION_NAME } from '@/const'
import { db } from '@/db'
import { go } from '@/helpers'
import { badRequest, internalError } from '@/http'

export const handleSetupAction = async (interaction: APIChatInputApplicationCommandInteraction) => {
  const roleId = getCommandOptionValue(interaction, SETUP_ACTION_OPTION_NAME) ?? ''
  const guildId = interaction.guild_id ?? ''

  if (!roleId) return badRequest('Missing verified role ID')
  if (!guildId) return badRequest('Missing guild ID')

  const [err] = await go(() => db.verifiedRolesQ.set(guildId, roleId))

  if (err) return internalError('Failed to save verified role')

  const response: APIInteractionResponse = {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      flags: MessageFlags.Ephemeral,
      content: 'Rarimo Proof of Humanity Verify Action has been setup successfully!',
    },
  }

  return Response.json(response)
}
