import '@/styles/index.scss'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import localFont from 'next/font/local'
import { ReactNode } from 'react'

import Logo from '@/components/Icons/Logo'
import StatusMessage from '@/components/StatusMessage'
import { I18nProvider, ThemeRegistry } from '@/providers'

const inter = localFont({
  display: 'swap',
  src: [
    {
      path: './Inter-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Inter-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
})

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={params.locale} className={inter.className}>
      <body className={'app'}>
        <ThemeRegistry>
          <I18nProvider locale={params.locale}>
            <Box
              component='main'
              sx={{
                display: 'flex',
                flex: 1,
                bgcolor: 'var(--ui-app-background)',
                zIndex: 2,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  minHeight: 661,
                  height: 661,
                  width: '100%',
                  background: 'var(--ui-app-home-gradient-2)',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'var(--ui-app-home-gradient)',
                  }}
                />
              </Box>
              <img
                src={'/squares.png'}
                alt=''
                width={'100%'}
                height={650}
                style={{
                  position: 'absolute',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                  zIndex: '-1',
                }}
              />
              <AppBar
                position='fixed'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  boxShadow: 'none',
                  bgcolor: 'transparent',
                  backgroundImage: 'none',
                  p: {
                    xs: 'var(--ui-header-padding-xs)',
                    sm: 'var(--ui-header-padding-sm)',
                    lg: 'var(--ui-header-padding-lg)',
                  },
                }}
              >
                <Stack
                  flexDirection='row'
                  alignItems='center'
                  sx={{
                    maxWidth: 'var(--ui-max-width)',
                    m: '0 auto',
                    width: '100%',
                    flex: '1',
                    maxHeight: 40,
                  }}
                >
                  <Logo />
                </Stack>
              </AppBar>
              <Stack
                flex={1}
                spacing={{
                  xs: 4.5,
                  xl: 6,
                }}
                sx={{
                  width: '100%',
                  margin: '0 auto',
                  alignItems: 'center',
                  padding: {
                    xs: 'var(--ui-content-padding-xs)',
                    sm: 'var(--ui-content-padding-sm)',
                    lg: 'var(--ui-content-padding-lg)',
                  },
                }}
              >
                <Stack
                  flex={1}
                  sx={{
                    width: '100%',
                    maxWidth: 'var(--ui-max-width)',
                    zIndex: 2,
                  }}
                >
                  {children}
                </Stack>
              </Stack>
            </Box>
            <StatusMessage />
          </I18nProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
