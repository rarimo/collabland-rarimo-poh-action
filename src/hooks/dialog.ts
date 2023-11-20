import { useState } from 'react'

export const useDialog = (onSubmitHandler?: () => Promise<void>) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const openDialog = () => {
    setIsDialogOpened(true)
  }

  const closeDialog = () => {
    setIsDialogOpened(false)
  }

  const onSubmit = async () => {
    if (isDialogOpened) closeDialog()
    if (onSubmitHandler) await onSubmitHandler()
  }

  return {
    isDialogOpened,
    isDisabled,
    openDialog,
    closeDialog,
    onSubmit,
    setIsDisabled,
  }
}
