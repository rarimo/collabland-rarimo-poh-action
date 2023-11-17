import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

type StepCardItem = {
  title: string
  description: string
  icon: ReactNode
  bodyTitle: string
  bodyDescription: string
  action: ReactNode
}

export default async function StepCard({ item }: { item: StepCardItem }) {
  return (
    <Stack flex={1} maxWidth={320}>
      <Typography
        variant={'h5'}
        align={'center'}
        sx={{ textTransform: 'uppercase' }}
        fontWeight={600}
      >
        {item.title}
      </Typography>
      <Typography
        mt={1}
        align={'center'}
        variant={'subtitle2'}
        sx={{ color: 'var(--col-txt-secondary)', textTransform: 'uppercase' }}
      >
        {item.description}
      </Typography>
      <Stack
        component={Paper}
        sx={{
          mt: 3,
          p: 3,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          border: 'var(--ui-border)',
          background: 'var(--ui-paper-elevation-2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            borderTop: 'var(--ui-border)',
            borderBottom: 'var(--ui-border)',
            p: 2,
            width: '100%',
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.icon}
        </Box>
        <Stack
          sx={{
            pt: 3,
            pb: 3,
            width: '100%',
            height: 120,
            borderBottom: 'var(--ui-border)',
          }}
          spacing={1}
        >
          <Typography
            align={'center'}
            variant={'body1'}
            fontWeight={600}
            color={'var(--col-primary-main)'}
          >
            {item.bodyTitle}
          </Typography>
          <Typography
            mt={1}
            align={'center'}
            fontSize={14}
            variant={'caption'}
            sx={{ color: 'var(--col-txt-secondary)' }}
          >
            {item.bodyDescription}
          </Typography>
        </Stack>
        <Stack
          sx={{
            pt: 3,
            pb: 3,
            width: '100%',
            borderBottom: 'var(--ui-border)',
          }}
          spacing={1}
        >
          {item.action}
        </Stack>
      </Stack>
    </Stack>
  )
}
