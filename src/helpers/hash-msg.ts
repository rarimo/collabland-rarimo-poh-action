import { keccak256 } from '@ethersproject/keccak256'
import { toUtf8Bytes } from '@ethersproject/strings'

import { Message } from '@/types'

export const hashMessage = (message: Message): string => {
  return keccak256(toUtf8Bytes(JSON.stringify(message)))
}
