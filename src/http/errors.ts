import { APIInteractionResponse, InteractionResponseType, MessageFlags } from '@collabland/discord'

import { logger } from '@/log'

export const unathorized = (reason?: string) => {
  const msg = "You're not authorized to access this resource"

  const response: APIInteractionResponse = {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      flags: MessageFlags.Ephemeral,
      ...makeEmbeds('Unauthorized', withReason(msg, reason)),
    },
  }

  return Response.json(response)
}

export const badRequest = (reason?: string) => {
  const response: APIInteractionResponse = {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      flags: MessageFlags.Ephemeral,
      ...makeEmbeds('Bad Request', withReason('The request was malformed', reason)),
    },
  }

  return Response.json(response)
}

export const internalError = (reason?: string, err?: Error) => {
  if (err) logger.error(`Internal error: ${err.message}`, err)

  const response: APIInteractionResponse = {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      flags: MessageFlags.Ephemeral,
      ...makeEmbeds('Internal Server Error', withReason('Something went wrong', reason)),
    },
  }

  return Response.json(response)
}

const withReason = (msg: string, reason?: string) => (reason ? `${msg}, reason: ${reason}` : msg)

const makeEmbeds = (title: string, description: string) => ({
  embeds: [
    {
      title: 'Rarimo Proof of Humanity Action: ' + title,
      description,
      color: 15548997,
    },
  ],
})
