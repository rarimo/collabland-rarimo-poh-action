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
          description: 'To prove your humanity, please follow these steps:',
          fields: [
            {
              name: 'Step 1️⃣',
              value: `Click on the "Verify Your Humanity" button which will redirect you to the Rarimo Proof of Humanity DApp`,
            },
            {
              name: 'Step 2️⃣',
              value: `Choose one of many Identity providers in the DApp and make sure that you fully go through the verification process until you see the "You're already on the human side of the web" message.`,
            },
            {
              name: 'Step 3️⃣',
              value: `Come back to Discord, follow the instructions provided by the Collab.Land bot to verify you hold a PoH Credential`,
            },
          ],
          // https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
          color: 3447003,
          image: {
            url: 'https://raw.githubusercontent.com/rarimo/collabland-rarimo-poh-action/1.0.0/public/thumbnail.png',
            height: 512,
            width: 896,
          },
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
