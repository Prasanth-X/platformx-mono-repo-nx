import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Profile from '../../assets/images/avatar.png';
import Logo from '../../assets/images/platform-x-logo.png';
// import { Store } from '../../store/ContextStore';
// import ThemeConstants from '../../theme/variable';
// import { logoutUrl } from '../../utils/authConstants';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { useTranslation } from 'react-i18next';
import LanguageDropDown from '../LanguageDropDown/LanguageDropDown';
import useUserSession from '../../hooks/useUserSession/useUserSession';
// import { callSaveandResetWarning } from '../../store/Actions';
import {
  getCurrentLang,
  getSelectedRoute,
  getSelectedSite,
} from '../../utils/helperFns';
import { LOGOUT_URL } from '../../constants/AuthConstant';
import ThemeConstants from '../../themes/authoring/lightTheme/lightThemeVariable';
import PlateformXDialog from '../Popups/PlateformXDialog';

const saveWarningMessage = {
  saveWarnTitle: 'Unsaved Changes',
  saveWarnSubtitle:
    'You have unsaved changes, do you want to save them before moving out of this window?',
  saveWarnSave: 'Save',
  saveWarnReject: 'Take me out',
};

export const Header = (props) => {
  const { t, i18n } = useTranslation();
  const [getSession] = useUserSession();
  const { userInfo, isActive } = getSession();
  // const { state, dispatch } = useContext(Store); // TODO need to check this
  // const { page } = state;
  // const { quiz } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const { saveWarnTitle, saveWarnSubtitle, saveWarnSave, saveWarnReject } =
    saveWarningMessage;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const [hasSaveWarning, setHasSaveWarning] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorE2);
  const [triggerCase, setTriggerCase] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onCloseSaveWarningHandler = () => {
    setHasSaveWarning(false);
    // dispatch(callSaveandResetWarning(true));// TODO need to check this
  };
  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorE2(null);
  };
  const hasUnsavedChanges = () => {
    // if (location.pathname.includes('/edit-page') && page?.showSaveWarning) {      // TODO need to check this
    if (location.pathname.includes('/edit-page')) {
      setHasSaveWarning(true);
      return true;
    } else if (
      location.pathname.includes('/create-quiz')
      // quiz?.isUnsavedQuiz // TODO need to check this
    ) {
      setHasSaveWarning(true);
      return true;
    } else {
      return false;
    }
  };
  const [handleImpression] = usePlatformAnalytics();
  const callFnsCase = (triggerCaseSent) => {
    setHasSaveWarning(false);
    switch (triggerCaseSent) {
      case 'CHANGE_PWD':
        setAnchorE2(null);
        navigate('/change-password');
        break;
      case 'LOGOUT':
        handleImpression('Logout User', {
          eventType: 'Logout User',
          LogOutUser: true,
        });
        localStorage.removeItem('path');
        window.location.replace(LOGOUT_URL);
        break;
      case 'PAGE_LIST':
        navigate('/page-list');
        break;
    }
  };
  const handleChangePassword = () => {
    setTriggerCase('CHANGE_PWD');
    if (!hasUnsavedChanges()) {
      callFnsCase('CHANGE_PWD');
    }
  };
  const handlePrelem = () => {
    setAnchorE2(null);
    navigate('/page-list');
  };
  const handleLogout = () => {
    setTriggerCase('LOGOUT');
    if (!hasUnsavedChanges()) {
      callFnsCase('LOGOUT');
    }
  };
  const handleLogoClick = () => {
    if (!hasUnsavedChanges()) {
      getSelectedRoute()
        ? navigate('/dashboard')
        : window.location.replace(
          `${process.env.NX_BASE_URL
          }/${getSelectedSite()}/en/dashboard`
        );
    } else {
      setTriggerCase('PAGE_LIST');
    }
  };
  const unsavedCrossButtonHandle = () => {
    setHasSaveWarning(false);
  };
  return (location.pathname === '/change-password' ||
    location.pathname.includes('/preview-page') ||
    location.pathname.includes('/article-preview') ||
    location.pathname.includes('/vod-preview')) &&
    isActive ? (
    <></>
  ) : (
    <Box
      sx={{
        backgroundColor: isActive
          ? '#ffffff'
          : ThemeConstants.SECONDARY_MAIN_COLOR,
        paddingTop: isActive ? '10px' : '15px',
        paddingBottom: isActive ? '10px' : '15px',
        display: 'inline-block',
        width: '100%',
      }}
    >
      <Box
        sx={{
          paddingLeft: isActive ? '20px' : '40px',
          paddingRight: isActive ? '20px' : '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {isActive ? (
          <Box onClick={handleLogoClick} sx={{ cursor: 'pointer' }}>
            <img src={Logo} height="30" />
          </Box>
        ) : (
          <Typography
            color={ThemeConstants.WHITE_COLOR}
            sx={{
              fontSize: {
                xs: ThemeConstants.FONTSIZE_LG,
                md: ThemeConstants.FONTSIZE_XL,
                lg: ThemeConstants.FONTSIZE_XL,
              },
            }}
          >
            {props.title}
          </Typography>
        )}
        {isActive ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ marginRight: { xs: '5px', md: '15px', lg: '20px' } }}>
              <LanguageDropDown />
            </Box>
            <Typography
              sx={{
                fontSize: {
                  xs: ThemeConstants.FONTSIZE_SM,
                  md: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
                  xl: ThemeConstants.FONTSIZE_MD,
                },
              }}
              mr={2}
              color={ThemeConstants.BLACK_COLOR}
            >
              {userInfo?.name}
            </Typography>
            <Avatar src={Profile} onClick={handleOpen} />
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              {props.pages.map((item, index) => (
                <Box
                  sx={{
                    display: { xs: 'none', md: 'none', lg: 'flex' },
                  }}
                  key={index}
                >
                  <Typography
                    variant="subtitle1"
                    color={ThemeConstants.WHITE_COLOR}
                    sx={{ paddingRight: '20px', cursor: 'pointer' }}
                    className="homepagenav"
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
              <Box
                sx={{
                  display: { xs: 'none', md: 'none', lg: 'flex' },
                  paddingRight: '20px',
                }}
              >
                <Button
                  variant="outlined"
                  className="homepagenav"
                  sx={{
                    textTransform: 'none',
                    borderColor: ThemeConstants.WHITE_COLOR,
                    color: ThemeConstants.WHITE_COLOR,
                    borderRadius: '34px',
                    minWidth: '120px',
                    padding: '10px 20px',
                    '&:hover': {
                      color: ThemeConstants.WHITE_COLOR,
                      borderColor: ThemeConstants.WHITE_COLOR,
                    },
                  }}
                  onClick={props.onLoginClick}
                >
                  Login
                </Button>
              </Box>
              <Box
                sx={{
                  display: { xs: 'none', md: 'none', lg: 'flex' },
                }}
              >
                <Button
                  variant="outlined"
                  className="homepagenav"
                  sx={{
                    textTransform: 'none',
                    borderColor: ThemeConstants.WHITE_COLOR,
                    color: ThemeConstants.WHITE_COLOR,
                    borderRadius: '34px',
                    minWidth: '120px',
                    padding: '10px 20px',
                    '&:hover': {
                      color: ThemeConstants.WHITE_COLOR,
                      borderColor: ThemeConstants.WHITE_COLOR,
                    },
                  }}
                >
                  Price
                </Button>
              </Box>
            </Box>
            <Box>
              <IconButton
                aria-label="upload picture"
                component="span"
                onClick={handleClick}
                sx={{
                  display: { xs: 'flex', md: 'flex', lg: 'none' },
                }}
              >
                <MenuIcon style={{ color: ThemeConstants.WHITE_COLOR }} />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {props.pages.map((item, index) => (
                  <MenuItem onClick={handleClose} key={index}>
                    <Typography variant="subtitle1">{item}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleClose}>
                  <Button
                    className="homepagenav"
                    variant="contained"
                    onClick={props.onLoginClick}
                  >
                    Sign In
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button className="homepagenav" variant="contained">
                    Price
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        )}
        <Menu
          anchorEl={anchorE2}
          open={openMenu}
          onClose={handleCloseMenu}
          sx={{
            '.Platform-x-Menu-paper': {
              boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
              borderRadius: '7px',
            },
          }}
        >
          <MenuItem
            disableRipple
            onClick={handleChangePassword}
            sx={{
              backgroundColor: ThemeConstants.WHITE_COLOR,
              '&:hover': {
                backgroundColor: ThemeConstants.WHITE_COLOR,
                color: '#fd0c0d',
              },
            }}
          >
            Change Password
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={handleLogout}
            sx={{
              backgroundColor: ThemeConstants.WHITE_COLOR,
              '&:hover': {
                backgroundColor: ThemeConstants.WHITE_COLOR,
                color: '#fd0c0d',
              },
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
      {hasSaveWarning ? (
        <PlateformXDialog
          isDialogOpen={hasSaveWarning}
          title={saveWarnTitle}
          subTitle={saveWarnSubtitle}
          closeButtonText={saveWarnReject}
          confirmButtonText={saveWarnSave}
          confirmButtonHandle={onCloseSaveWarningHandler}
          closeButtonHandle={() => callFnsCase(triggerCase)}
          crossButtonHandle={unsavedCrossButtonHandle}
          modalType="unsavedChanges"
        />
      ) : null}
      {/* <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme={'colored'}
        icon={true}
      /> */}
    </Box>
  );
};
