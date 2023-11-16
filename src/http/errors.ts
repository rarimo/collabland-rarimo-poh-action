import { logger } from '@/log'

export const unathorized = (reason?: string) => {
  return Response.json(
    {
      error: {
        title: 'Unauthorized',
        description: "You're not authorized to access this resource",
        ...(reason && { reason }),
      },
    },
    { status: 401 },
  )
}

export const badRequest = (reason?: string) => {
  return Response.json(
    {
      error: {
        title: 'Bad Request',
        description: 'The request was malformed',
        ...(reason && { reason }),
      },
    },
    { status: 400 },
  )
}

export const internalError = (reason?: string, err?: Error) => {
  if (err) logger.error(`Internal error: ${err.message}`, { error: err })

  return Response.json(
    {
      error: {
        title: 'Internal Server Error',
        description: 'Something went wrong',
        ...(reason && { reason }),
      },
    },
    { status: 500 },
  )
}
