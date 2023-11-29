import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EmptySiteBox from '../../../assets/svg/emptysitebox.svg';
import ThemeConstants from '../../../theme/variable';
import { useEmptyResultStyle } from './EmptyResult.style';
import { AddNewButton } from './SiteListing.style';
import { useNavigate } from 'react-router';

const EmptyResult = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const classes = useEmptyResultStyle();
  return (
    <Box className={classes.emptysite}>
      <img src={EmptySiteBox} />
      <Box className={classes.nofilter}>
        <Typography variant='h5' className={classes.noresult}>
          {t('there_are_no_files_here')}
        </Typography>
      </Box>

      <Box className={classes.typonew}>
        <Typography variant='h5' className={classes.pagecontent}>
          {t('please_create_your_first_site')}
        </Typography>
      </Box>
      <Box sx={{ marginTop: '8px' }} className={classes.creathide}>
        <AddNewButton onClick={() => navigate('/sites/site-creation')}>
          <Box component='span'>{t('create_new')}</Box>
        </AddNewButton>
      </Box>
    </Box>
  );
};

export default EmptyResult;
