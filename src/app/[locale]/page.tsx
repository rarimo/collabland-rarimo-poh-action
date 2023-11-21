import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Metadata } from 'next'

import ConnectWalletButton from '@/components/ConnectWalletButton'
import DiscordLogo from '@/components/Icons/DiscordLogo'
import RaLogo from '@/components/Icons/RaLogo'
import LoginDiscordButton from '@/components/LoginDiscordButton'
import StepCard from '@/components/StepCard'
import VerifyButton from '@/components/VerifyButton'
import { serverConfig } from '@/config/server'
import { db } from '@/db'
import { go } from '@/helpers/go'
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

export const metadata: Metadata = {
  metadataBase: new URL(serverConfig.appUrl),
  description: serverConfig.appDescription,
  applicationName: serverConfig.appName,
  title: serverConfig.appName,
  themeColor: '#ffffff',
  colorScheme: 'light',
  // eslint-disable-next-line prettier/prettier
  viewport: 'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0',
  creator: 'Zero Block Global Foundation',
  openGraph: {
    title: serverConfig.appName,
    description: serverConfig.appDescription,
    locale: 'en_GB',
    type: 'website',
    images: '/thumbnail.jpg',
  },
  twitter: {
    description: serverConfig.appDescription,
    title: serverConfig.appName,
    card: 'summary_large_image',
    images: '/thumbnail.jpg',
  },
}

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

export default async function Index({
  searchParams,
}: {
  searchParams: { guild_id?: string; state?: string; code?: string }
}) {
  const i18n = await getI18n()
  const guildId = searchParams?.guild_id ?? searchParams?.state ?? ''
  const authCode = searchParams?.code ?? ''
  const role = await getVerifiedRole(guildId)

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
      action: <LoginDiscordButton guildId={guildId} code={authCode} />,
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
