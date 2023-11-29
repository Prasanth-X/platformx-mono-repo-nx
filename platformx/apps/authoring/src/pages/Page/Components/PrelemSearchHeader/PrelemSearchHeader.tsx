import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import LanguageDropDown from '../../../../Common/LanguageDropDown';
import { createSearchParams, useNavigate } from 'react-router-dom';
import NotificationBox from '../../../../layouts/Dashboardlayout/component/Header/NotificationBox';
import PlatXLogo from '../../../../assets/svg/PlatX-logo.svg';
import { useStyles } from './PrelemSearchHeader.styles';
import { MiniHeader } from '../../../../components/Header/MiniHeader';
import ThemeConstants from '../../../../theme/variable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

const PrelemSearchHeader = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const noWeb = useMediaQuery(`@media(max-width:${ThemeConstants.EM - 1}px)`);
  const ifTab = useMediaQuery(theme.breakpoints.up('sm'));
  const getBreakPoint = () => {
    return ifTab;
  };
  return (
    <Box className={classes.prelemsearchheader}>
      <Grid container>
        <Grid item xs={2} md={2} sx={{ display: 'flex', alignItems: 'center'}}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => {
            const path = localStorage.getItem('path');
            if (path) {
              navigate(
                {
                  pathname: '/edit-page',
                  search: `?${createSearchParams({
                    page: path.toString(),
                  })}`,
                }
              );
            } else navigate('/edit-page');
          }}><ArrowBackIcon sx={{ marginRight: '10px'}} /> {!noWeb && t('back')}</Box>
        </Grid>
        <Grid
          item
          xs={10}
          md={10}
          className='d-flex alignitemscenter justify-content-end'
        >
          <Box className='d-flex alignitemscenter justify-content-end'>
            <LanguageDropDown />
            <NotificationBox />
            {getBreakPoint() && (
              <Box className='headerAvatarIcon' sx={{ marginLeft: '20px' }}>
                <MiniHeader showUserDetails={false} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrelemSearchHeader;
