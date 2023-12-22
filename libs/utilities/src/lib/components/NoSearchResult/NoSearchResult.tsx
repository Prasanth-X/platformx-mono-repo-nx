import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import NoSearchResultsvg from '../../assets/svg/NoSearchResult.svg';

const NoSearchResult = () => {
  const { t } = useTranslation();

  return (
    <Box textAlign="center">
      <img src={NoSearchResultsvg} width={175} height={175} />
      <Typography variant="h3bold">{t('no_result_found')}</Typography>
      <Typography variant="h5regular">
        {t('try_with_different_keyword')}
      </Typography>
    </Box>
  );
};

export default NoSearchResult;
