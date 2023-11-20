'use client'

import { errors } from '@distributedlab/w3p'
import { AlertColor } from '@mui/material'
import isObject from 'lodash/isObject'
import { useEffect, useState } from 'react'

import { Bus, EventBusEventName } from '@/helpers/event-bus'
import { useI18n } from '@/locales/client'
import { ErrorHandlerPayload, StatusMessagePayload } from '@/types'

import SnackbarInfo from './SnackbarInfo'

const STATUS_MESSAGE_AUTO_HIDE_DURATION = 10000

export default function StatusMessage() {
  const t = useI18n()
  const [isStatusMessageShown, setIsStatusMessageShown] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [severity, setSeverity] = useState<EventBusEventName>('info')

  const getErrorMessage = (error: Error): string => {
    switch (error.constructor) {
      case errors.ProviderInjectedInstanceNotFoundError:
        return t('common.labels.wallet-extension-not-installed')
      default:
        return t('common.labels.something-wrong')
    }
  }

  const busOnHandler = (severity: EventBusEventName, payload: StatusMessagePayload) => {
    let msg = isObject(payload) ? payload?.message ?? '' : payload

    if (severity === Bus.eventList.error) {
      const err = (payload as ErrorHandlerPayload)?.error
      msg ||= err ? getErrorMessage(err) : t('common.labels.something-wrong')
    }
    if (severity === Bus.eventList.warning) {
      msg ||= t('common.labels.warning')
    }
    if (severity === Bus.eventList.success) {
      msg ||= t('common.labels.success')
    }
    if (severity === Bus.eventList.info) {
      msg ||= t('common.labels.info')
    }

    setSeverity(severity)
    setIsStatusMessageShown(true)
    setStatusMessage(msg)
  }

  useEffect(() => {
    Bus.on<StatusMessagePayload>(Bus.eventList.error, payload => {
      busOnHandler(Bus.eventList.error, payload)
    })
    Bus.on<StatusMessagePayload>(Bus.eventList.warning, payload => {
      busOnHandler(Bus.eventList.warning, payload)
    })
    Bus.on<StatusMessagePayload>(Bus.eventList.success, payload => {
      busOnHandler(Bus.eventList.success, payload)
    })
    Bus.on<StatusMessagePayload>(Bus.eventList.info, payload => {
      busOnHandler(Bus.eventList.info, payload)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clear = () => {
    setIsStatusMessageShown(false)
  }

  return (
    <SnackbarInfo
      isOpened={isStatusMessageShown}
      autoHideDuration={STATUS_MESSAGE_AUTO_HIDE_DURATION}
      message={statusMessage}
      severity={severity as AlertColor}
      close={clear}
    />
  )
}
