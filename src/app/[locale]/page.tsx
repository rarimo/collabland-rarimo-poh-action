import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Metadata } from 'next'

import ConnectDiscordButton from '@/components/ConnectDiscordButton'
import ConnectWalletButton from '@/components/ConnectWalletButton'
import DiscordLogo from '@/components/DiscordLogo'
import RaLogo from '@/components/RaLogo'
import StepCard from '@/components/StepCard'
import VerifyButton from '@/components/VerifyButton'
import { METADATA } from '@/config'
import { db } from '@/db'
import { go } from '@/helpers'
import { getI18n } from '@/locales/server'
import { logger } from '@/log'
import { VerifiedRole } from '@/types'

const ICON_SX = {
  sx: {
    width: 42,
    minWidth: 42,
    height: 42,
    minHeight: 42,
    color: 'var(--col-action-active)',
  },
}

const TITLE_PROPS = {
  align: 'center',
  fontWeight: 700,
  variant: 'h3',
  textTransform: 'uppercase',
  color: 'var(--col-primary-main)',
} as const

const DESCRIPTION_PROPS = {
  align: 'center',
  variant: 'subtitle1',
  fontWeight: 500,
  mt: 2,
  color: 'var(--col-txt-secondary)',
  textTransform: 'uppercase',
} as const

export const metadata: Metadata = METADATA

const getVerifiedRole = async (guildId: string): Promise<VerifiedRole | null> => {
  const [err, role] = await go(() => db.verifiedRolesQ.get(guildId))
  if (err) {
    logger.error('Failed to get verification role', err)
    return null
  }

  if (!role) {
    logger.info('No verification role found', { guildId })
    return null
  }

  return { guildId: role.guild_id, roleId: role.role_id }
}

export default async function Index({ searchParams }: { searchParams: { guild_id?: string } }) {
  const i18n = await getI18n()
  const role = await getVerifiedRole(searchParams.guild_id ?? '')

  const steps = [
    {
      title: i18n('index.step-lbl', { step: 1 }),
      description: i18n('index.connect-wallet-lbl'),
      icon: <AccountBalanceWalletOutlinedIcon {...ICON_SX} />,
      bodyTitle: i18n('index.connect-wallet-lbl'),
      bodyDescription: i18n('index.connect-wallet-desc'),
      action: <ConnectWalletButton />,
    },
    {
      title: i18n('index.step-lbl', { step: 2 }),
      description: i18n('index.connect-discord-lbl'),
      icon: <DiscordLogo {...ICON_SX} />,
      bodyTitle: i18n('index.connect-discord-lbl'),
      bodyDescription: i18n('index.connect-discord-desc'),
      action: <ConnectDiscordButton />,
    },
    {
      title: i18n('index.step-lbl', { step: 3 }),
      description: i18n('index.verify-poh-lbl'),
      icon: <RaLogo {...ICON_SX} />,
      bodyTitle: i18n('index.verify-poh-lbl'),
      bodyDescription: i18n('index.verify-poh-desc'),
      action: <VerifyButton />,
    },
  ]

  return (
    <Stack sx={{ margin: 'auto', width: '100%' }}>
      {role ? (
        <>
          <Typography {...TITLE_PROPS}>{i18n('index.title-lbl')}</Typography>
          <Typography {...DESCRIPTION_PROPS}>{i18n('index.description-lbl')}</Typography>
          <Stack
            mt={{ xs: 5, sm: 8 }}
            direction={'row'}
            spacing={4}
            p={2}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {steps.map((item, idx) => (
              <StepCard key={idx} item={item} />
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Typography {...TITLE_PROPS}>{i18n('index.no-role-title-lbl')}</Typography>
          <Typography {...DESCRIPTION_PROPS}>{i18n('index.no-role-description-lbl')}</Typography>
        </>
      )}
    </Stack>
  )
}
