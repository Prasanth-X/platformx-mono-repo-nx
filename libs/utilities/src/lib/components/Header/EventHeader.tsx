import { Avatar, Box, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Profile from '../../assets/images/avatar.png';
// import { Store } from '../../store/ContextStore';
// import ThemeConstants from '../../theme/variable';
// import { logoutUrl } from '../../utils/authConstants';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import useUserSession from '../../hooks/useUserSession/useUserSession';
import { LOGOUT_URL } from '../../constants/AuthConstant';
import ThemeConstants from '../../themes/authoring/lightTheme/lightThemeVariable';
import PlateformXDialog from '../Popups/PlateformXDialog';
import { PageData } from 'analytics';
// import { callSaveandResetWarning } from '../../store/Actions';
// import PlateformXDialog from '../Modal';

const saveWarningMessage = {
  saveWarnTitle: 'Unsaved Changes',
  saveWarnSubtitle:
    'You have unsaved changes, do you want to save them before moving out of this window?',
  saveWarnSave: 'Save',
  saveWarnReject: 'Take me out',
};

export const EventHeader = (props) => {
  const [getSession] = useUserSession();
  const { userInfo, isActive } = getSession();
  // const { state, dispatch } = useContext(Store);
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
  // const onCloseSaveWarningHandler = () => { //TODO: need to check if this is required
  //   setHasSaveWarning(false);
  //   dispatch(callSaveandResetWarning(true));
  // };
  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorE2(null);
  };
  const hasUnsavedChanges = () => {
    // if (location.pathname.includes('/edit-page') && page?.showSaveWarning) {
    if (location.pathname.includes('/edit-page')) {
      // TODO: need to check if this is required
      setHasSaveWarning(true);
      return true;
    } else if (
      location.pathname.includes('/create-quiz')
      // quiz?.isUnsavedQuiz // TODO: need to check if this is required
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
      navigate('/page-list');
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
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6medium" mr={1}>
            {userInfo?.name}
          </Typography>
          <Avatar src={Profile} onClick={handleOpen} />
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
      {/* {hasSaveWarning && ( //TODO: need to check if this is required
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
      )} */}
    </Box>
  );
};
