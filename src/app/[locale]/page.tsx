import { Metadata } from 'next'

import { METADATA } from '@/config'

export const metadata: Metadata = METADATA

export default function HomePage() {
  return (
    <div>
      <p>Hello</p>
    </div>
  )
}
