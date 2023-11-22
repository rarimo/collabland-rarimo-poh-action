import { logger } from '@/log'

export const badRequest = (params?: Record<string, unknown>) => {
  return Response.json(
    {
      title: 'Bad Request',
      description: 'Request was malformed',
      ...(params && { params }),
    },
    { status: 400 },
  )
}

export const internalError = (message: string, err: Error) => {
  logger.error(message, err)

  return Response.json(
    {
      title: 'Internal Server Error',
      description: message,
    },
    { status: 500 },
  )
}

export const notFound = (params?: Record<string, unknown>) => {
  return Response.json(
    {
      title: 'Not Found',
      description: 'Resource not found',
      ...(params && { params }),
    },
    { status: 404 },
  )
}
