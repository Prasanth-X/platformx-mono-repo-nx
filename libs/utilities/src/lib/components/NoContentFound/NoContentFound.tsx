import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import NoContentFoundSvg from '../../assets/svg/NoContentFound.svg'

export const NoContentFound = () => {
  const { t } = useTranslation()

  return (
    <Box
      textAlign="center"
      sx={{ width: '250px', height: '250px', padding: '10px' }}
    >
      <img src={NoContentFoundSvg} width={175} height={175} />
      <Typography variant="h5regular">{t('no_content_found')}</Typography>
    </Box>
  )
}
