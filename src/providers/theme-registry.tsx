'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactNode } from 'react'

import { COMPONENTS, PALETTE, TYPOGRAPHY_THEME } from '@/theme'

import { NextAppDirEmotionCacheProvider } from './emotion-cache'

export function ThemeRegistry({ children }: { children: ReactNode }) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      ...PALETTE,
    },
    typography: TYPOGRAPHY_THEME,
    components: COMPONENTS,
    shape: {
      borderRadius: 0,
    },
  })

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
