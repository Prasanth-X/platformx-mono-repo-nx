import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import NoResults from './../assets/images/no-results.png';
import ThemeConstants from '../../../../libs/utilities/src/lib/themes/authoring/variable';

const NoResultsFound = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ textAlign: 'center', marginTop: '5%' }}>
      <img src={NoResults} />
      <Typography
        variant="h3regular"
        sx={{
          color: '#c3c3c3',
        }}
      >
        {t('no_results')}
      </Typography>
    </Box>
  );
};

export default NoResultsFound;
