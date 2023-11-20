import {
  APIInteractionResponse,
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
} from '@collabland/discord'
import { DiscordActionRequest } from '@collabland/discord'
import { join } from 'path'

import { config } from '@/config'
import { db } from '@/db'
import { go } from '@/helpers/go'
import { internalError } from '@/http'

export const handleVerifyAction = async (interaction: DiscordActionRequest) => {
  const guildId = interaction.guild_id ?? ''

  const [err, verifiedRole] = await go(() => db.verifiedRolesQ.get(guildId))
  if (err) return internalError('Failed to get verified role')

  if (!verifiedRole) {
    return Response.json({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content:
          "Rarimo Proof of Humanity Verify Action hasn't been setup yet, please run /setup first.",
      },
    })
  }

  const redirectUrl = new URL(config.appUrl)
  redirectUrl.searchParams.set('guild_id', guildId)

  const imageUrl =
    process.env.NODE_ENV === 'development'
      ? 'https://rarimo.com/img/branding/og-img.jpg'
      : join(config.appUrl, '/thumbnail.jpg')

  const response: APIInteractionResponse = {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      // https://discord.com/developers/docs/resources/channel#message-object-message-flags
      flags: MessageFlags.Ephemeral,
      embeds: [
        {
          title: `Welcome to ${interaction?.actionContext?.guildName}!`,
          description:
            "Upon clicking the button, you'll be redirected to the verification page. Your role will automatically be assigned upon a successful Proof of Humanity verification.",
          // https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
          color: 3447003,
          image: { url: imageUrl, height: 256, width: 512 },
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              style: ButtonStyle.Link,
              label: 'Verify Your Humanity',
              type: ComponentType.Button,
              url: redirectUrl.toString(),
            },
          ],
        },
      ],
    },
  }

  return Response.json(response)
}
