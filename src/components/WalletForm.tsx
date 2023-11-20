import { PROVIDERS } from '@distributedlab/w3p'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { Controller } from 'react-hook-form'

import { ErrorHandler } from '@/helpers/error-handler'
import { go } from '@/helpers/go'
import { useForm } from '@/hooks'
import { useI18n } from '@/locales/client'

import FormWrapper from './FormWrapper'

const PROVIDER_OPTIONS = [
  {
    provider: PROVIDERS.Metamask,
    label: 'Metamask',
    icon: 'https://raw.githubusercontent.com/rarimo/js-sdk/2.0.0-rc.30/assets/logos/metamask.png',
  },
  {
    provider: PROVIDERS.Coinbase,
    label: 'Coinbase',
    icon: 'https://raw.githubusercontent.com/rarimo/js-sdk/2.0.0-rc.30/assets/logos/coinbase.png',
  },
]

const PROVIDER_LABEL_ID = 'provider-label'

enum ProviderFormFieldNames {
  Provider = 'provider',
}

const DEFAULT_VALUES = {
  [ProviderFormFieldNames.Provider]: PROVIDERS.Metamask,
}

export default function WalletForm({
  id,
  setIsDialogDisabled,
  connect,
}: {
  id: string
  connect: (providerType: PROVIDERS) => Promise<void>
  setIsDialogDisabled: (isDisabled: boolean) => void
}) {
  const t = useI18n()

  const {
    handleSubmit,
    control,
    isFormDisabled,
    formErrors,
    disableForm,
    enableForm,
    getErrorMessage,
  } = useForm(DEFAULT_VALUES, yup =>
    yup.object({
      [ProviderFormFieldNames.Provider]: yup.string().required(),
    }),
  )

  const submit = async (formData: typeof DEFAULT_VALUES) => {
    disableForm()
    setIsDialogDisabled(true)

    const [err] = await go(() => connect(formData.provider))

    if (err) ErrorHandler.process(err)

    enableForm()
    setIsDialogDisabled(false)
  }

  return (
    <FormWrapper id={id} onSubmit={handleSubmit(submit)} isFormDisabled={isFormDisabled}>
      <Typography variant={'body2'} color={'var(--col-txt-secondary)'}>
        {t('wallet-form.helper-text')}
      </Typography>

      <Controller
        name={ProviderFormFieldNames.Provider}
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel
              id={PROVIDER_LABEL_ID}
              error={Boolean(formErrors[ProviderFormFieldNames.Provider])}
            >
              {t('wallet-form.provider-type-lbl')}
            </InputLabel>
            <Select
              {...field}
              labelId={PROVIDER_LABEL_ID}
              label={t('wallet-form.provider-type-lbl')}
              disabled={isFormDisabled}
              error={Boolean(formErrors[ProviderFormFieldNames.Provider])}
              sx={{
                '& > .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                },
                '& > .MuiSvgIcon-root': {
                  top: '22px',
                },
              }}
            >
              {PROVIDER_OPTIONS.map((item, idx) => (
                <MenuItem value={item.provider} key={idx}>
                  <Image
                    src={item.icon}
                    width={32}
                    height={32}
                    alt={item.provider}
                    style={{
                      marginRight: '16px',
                    }}
                  />
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            {Boolean(formErrors[ProviderFormFieldNames.Provider]) && (
              <FormHelperText error>
                {getErrorMessage(formErrors[ProviderFormFieldNames.Provider])}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </FormWrapper>
  )
}
