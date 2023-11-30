import {
  APIInteractionResponse,
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
} from '@collabland/discord'
import { DiscordActionRequest } from '@collabland/discord'

import { config } from '@/config'

export const handleVerifyAction = async (interaction: DiscordActionRequest) => {
  const response: APIInteractionResponse = {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      // https://discord.com/developers/docs/resources/channel#message-object-message-flags
      flags: MessageFlags.Ephemeral,
      embeds: [
        {
          title: `Welcome to ${interaction?.actionContext?.guildName}!`,
          description: `To prove your humanity, please follow these steps:`,
          fields: [
            {
              name: '1. Acquiring Rarimo Proof of Humanity',
              value: `Click on the "Verify Your Humanity" button located directly beneath this message. This will redirect you to the Rarimo Proof of Humanity dApp, where you can obtain your proof of humanity. `,
            },
            {
              name: '2. Verifying assets through the Collab.Land Bot',
              value: `Once you have completed the verification on the Rarimo platform, return to Discord and navigate to the "collabland-join" channel. Follow the instructions provided by the Collab.Land bot to verify your assets, securing a verified role on the ${interaction?.actionContext?.guildName}! Discord server.`,
            },
            {
              name: '3. Enjoying your verified role',
              value: 'Revel in the benefits of your verified status within your community.',
            },
          ],
          // https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
          color: 3447003,
          image: { url: 'https://rarimo.com/img/branding/og-img.jpg', height: 256, width: 512 },
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
              url: config.pohAppUrl,
            },
          ],
        },
      ],
    },
  }

  return Response.json(response)
}
