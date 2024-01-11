import { Avatar, Box, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Profile from '../../assets/images/avatar.png';
// import { Store } from '../../store/ContextStore';
// import ThemeConstants from '../../theme/variable';
// import { logoutUrl } from '../../utils/authConstants';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import usePlatformAnalytics from '../../hooks/usePlatformAnalytics/usePlatformAnalytics';
import { useTranslation } from 'react-i18next';
import useUserSession from '../../hooks/useUserSession/useUserSession';
// import { callSaveandResetWarning } from '../../store/Actions';
// import { capitalizeFirstLetter } from '../../utils/helperFunctions';
// import PlateformXDialog from '../Modal';
import { Users } from './Header.types';
import ThemeConstants from '../../themes/authoring/lightTheme/lightThemeVariable';
import { LOGOUT_URL } from '../../constants/AuthConstant';
import PlateformXDialog from '../Popups/PlateformXDialog';
import { capitalizeFirstLetter } from '../../utils/helperFns';

const saveWarningMessage = {
  saveWarnTitle: 'Unsaved Changes',
  saveWarnSubtitle:
    'You have unsaved changes, do you want to save them before moving out of this window?',
  saveWarnSave: 'Save',
  saveWarnReject: 'Take me out',
};

export const MiniHeader = ({ showUserDetails = true }: Users) => {
  const { t } = useTranslation();
  const [getSession, updateSession] = useUserSession();
  const userSession = getSession();
  // const { state, dispatch } = useContext(Store); // TODO
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
  const [backgroundStyle, setBackgroundstyle] = useState('');

  useEffect(() => {
    setBackgroundstyle(ThemeConstants.WHITE_COLOR);
    return () => {
      setBackgroundstyle('');
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onCloseSaveWarningHandler = () => {
    setHasSaveWarning(false);
    // dispatch(callSaveandResetWarning(true));
  };
  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorE2(null);
  };
  const hasUnsavedChanges = () => {
    // if (location.pathname.includes('/edit-page') && page?.showSaveWarning) {
    if (location.pathname.includes('/edit-page')) {
      setHasSaveWarning(true);
      return true;
    } else if (
      location.pathname.includes('/create-quiz')
      // &&      quiz?.isUnsavedQuiz
    ) {
      setHasSaveWarning(true);
      return true;
    } else if (location.pathname.includes('/create-vod')) {
      setHasSaveWarning(true);
      return true;
    } else if (location.pathname.includes('/create-poll')) {
      setHasSaveWarning(true);
      return true;
    } else if (location.pathname.includes('/create-event')) {
      setHasSaveWarning(true);
      return true;
    } else {
      return false;
    }
  };
  const [handleImpression] = usePlatformAnalytics();
  const callFnsCase = (triggerCaseSent: any) => {
    setHasSaveWarning(false);
    switch (triggerCaseSent) {
      case 'CHANGE_PWD':
        setAnchorE2(null);
        navigate('/change-password');
        break;
      case 'LOGOUT': {
        const keycloakURL = LOGOUT_URL;
        const pageDataObj = {
          eventType: 'Logout User',
          LogOutUser: true,
        };
        handleImpression(pageDataObj.eventType, pageDataObj);
        localStorage.removeItem('selectedSite');
        localStorage.removeItem('imageUuid');
        localStorage.removeItem('videoUuid');
        localStorage.removeItem('path');

        updateSession(null); // TODO:  Check if this is required
        window.location.replace(keycloakURL);
        break;
      }
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

  const handleLogout = () => {
    setTriggerCase('LOGOUT');
    if (!hasUnsavedChanges()) {
      callFnsCase('LOGOUT');
    }
  };

  const unsavedCrossButtonHandle = () => {
    setHasSaveWarning(false);
  };
  const role: string = userSession.role;
  return (location.pathname === '/change-password' ||
    location.pathname.includes('/preview-page') ||
    location.pathname.includes('/article-preview') ||
    location.pathname.includes('/vod-preview')) &&
    userSession?.isActive ? (
    <></>
  ) : (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={Profile} onClick={handleOpen} />
          {showUserDetails && (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography component="div" variant="h6medium" ml={2}>
                {capitalizeFirstLetter(userSession?.userInfo?.name)}
              </Typography>

              <Typography component="div" variant="h7medium" ml={2}>
                {t(role)}
              </Typography>
            </Box>
          )}
        </Box>
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
            style={{ background: backgroundStyle }}
            disableRipple
            onClick={handleChangePassword}
            onMouseEnter={() => {
              setBackgroundstyle(ThemeConstants.OFF_WHITE_COLOR);
            }}
            onMouseLeave={() => {
              setBackgroundstyle(ThemeConstants.WHITE_COLOR);
            }}
            sx={{
              backgroundColor: ThemeConstants.WHITE_COLOR,
              '&:hover': {
                backgroundColor: ThemeConstants.OFF_WHITE_COLOR,
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
                backgroundColor: ThemeConstants.OFF_WHITE_COLOR,
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
