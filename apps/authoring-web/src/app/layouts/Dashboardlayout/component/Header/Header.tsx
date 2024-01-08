import { Box, Grid, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { LanguageDropDown, getSelectedSite, BackButton, MenuIcon } from '@platformx/utilities';
import SearchBox from '../SearchBox/SearchBox';
import './Header.css';
import { MiniHeader } from '@platformx/utilities';

import { t } from 'i18next';
import { useStyles } from './Header.styles';
import NotificationBox from './NotificationBox';
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isSideBar?: boolean;
}
const DrawerWidth = 250;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, isSideBar }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(!open && {
    ...(isSideBar
      ? {
        [theme.breakpoints.up('sm')]: {
          marginLeft: '65px',
          width: 'calc(100% - 65px)',
        },
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      }
      : {
        [theme.breakpoints.up('sm')]: {
          marginLeft: '0',
          width: '100%',
        },
      }),
  }),
  ...(open && {
    marginLeft: DrawerWidth,
    width: `calc(100% - ${DrawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // [theme.breakpoints.down('sm')]: {
    //   width: '100%',
    //   marginLeft: '0px',
    // },
  }),
}));

const Header = ({
  open,
  handleDrawerOpen,
  isSideBar,
  hasSearch = true,
  hasLogo = false,
  menuItemSelected,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isSiteSystem = getSelectedSite()?.toLowerCase() === 'system';
  const theme = useTheme();
  const pageUrl = new URL(window.location.href);
  // const userListUrl = new URL
  const ifTab = useMediaQuery(theme.breakpoints.up('sm'));
  const getBreakPoint = () => {
    return ifTab;
  };
  return (
    <AppBar
      position="sticky"
      className="topHeader"
      open={open}
      isSideBar={isSideBar}
    >
      <Grid container>
        <Grid item xs={10} className={classes.searchContainer}>
          {!hasSearch && !(pageUrl.pathname.split('/')[3] === 'navtree') && (
            <Box className="menuIcon" onClick={handleDrawerOpen}>
              <img alt='settings' src={MenuIcon} />
            </Box>
          )}

          {hasSearch && (
            <>
              <Box className="menuIcon" onClick={handleDrawerOpen}>
                <img alt='settings' src={MenuIcon} />
              </Box>
              {!isSiteSystem && (
                <SearchBox ifTab={ifTab} menuItemSelected={menuItemSelected} />
              )}
            </>
          )}

          {pageUrl.pathname.split('/')[3] === 'navtree' && (
            <>
              <Box
                onClick={() => navigate(-1)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <img alt='settings' src={BackButton} />{' '}
              </Box>
              <Box
                sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}
              >
                <Typography variant="h3medium" color="#2D2D39">
                  {t('navigation')}
                </Typography>
              </Box>
            </>
          )}
        </Grid>
        <Grid
          item
          xs={2}
          className="d-flex alignitemscenter justify-content-end"
        >
          <Box className="d-flex alignitemscenter justify-content-end">
            <LanguageDropDown />
            <NotificationBox />
            {getBreakPoint() && (
              <Box className="headerAvatarIcon">
                <MiniHeader showUserDetails={false} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
