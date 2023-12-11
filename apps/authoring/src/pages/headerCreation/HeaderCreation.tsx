import { useMutation } from '@apollo/client';
import HomeIcon from '@mui/icons-material/Home';
import MoreVertIcon from '@mui/icons-material/MoreVertRounded';
import { Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showToastError } from '../../components/toastNotification/toastNotificationReactTostify';

import { createMenuItem } from '../../services/menu/menu.api';
import LightTheme from '../../../../../libs/utilities/src/lib/themes/authoring/lightTheme';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { ExternalLinkModal } from './ExternalLinkModal';
import { PageLinkPopover } from './PageLinkPopover';

interface NavItemDef {
  Heading: string;
  URL: string;
  Internal: boolean;
  Rank: string;
  HomePage: boolean;
  IsHidden: boolean;
  name?: string;
}
export const HeaderCreation: React.FC = () => {
  const { t } = useTranslation();
  const [navItems, setNavItems] = useState<NavItemDef[] | []>([]);
  //setShowLinkExternal,setShowLinkPage
  const [showLinkExternal, setShowLinkExternal] = useState(false);
  const [showLinkPage, setShowLinkPage] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<NavItemDef | null>(
    null
  );
  const [home, setHome] = useState<string | undefined>(undefined);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); //anchorElCreate
  const [anchorElCreate, setAnchorElCreate] =
    React.useState<null | HTMLElement>(null);
  const [mutateCreateMenuItem] = useMutation(createMenuItem);
  const theme = {
    LightTheme,
  };
  const updateMenuItems = (menuItemName, menuProps, isInternal = true) => {
    const existingMenuItems = [...navItems];
    const content = {
      Heading: menuItemName,
      URL: menuProps.CurrentPageUrl,
      Internal: isInternal,
      Rank: '0',
      HomePage: false,
      IsHidden: false,
    };
    mutateCreateMenuItem({
      variables: {
        input: { MenuItem: content },
      },
    })
      .then((res) => {
        const navInstance: NavItemDef = {
          ...content,
          name: res.data.authoring_navigationItems.name,
        };
        existingMenuItems.push(navInstance);
        setNavItems(existingMenuItems);
      })
      .catch((err) => {
        showToastError(t('api_error_toast'));
      });
  };
  const open = Boolean(anchorEl);
  const openCreate = Boolean(anchorElCreate);
  const deleteMenuItem = () => {
    const menuListUpdated = navItems.filter(
      (item: any) => item.name != currentMenuItem?.name
    );
    setNavItems(menuListUpdated);
  };
  const markAsHompage = () => {
    setHome(currentMenuItem?.Heading);
  };
  const handleCloseDropDown = () => {
    setAnchorEl(null);
  };
  const handleCloseCreateDropDown = () => {
    setAnchorElCreate(null);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    menuItemSelected
  ) => {
    event.stopPropagation();
    setCurrentMenuItem(menuItemSelected);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickCreate = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorElCreate(event.currentTarget);
  };
  const handleCloseCreate = () => {
    setAnchorElCreate(null);
  };
  const handleCloseLinkPage = () => setShowLinkPage(false);
  const handleCloseLinkExternal = () => setShowLinkExternal(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: { xs: '0px', md: '25px 25px 0px 25px' },
      }}
    >
      <Button
        variant="contained"
        sx={{
          alignSelf: 'flex-end',
          backgroundColor: ThemeConstants.BLACK_COLOR,
          color: ThemeConstants.WHITE_COLOR,
          '&:hover': {
            backgroundColor: ThemeConstants.BLACK_COLOR,
            color: ThemeConstants.WHITE_COLOR,
          },
          minWidth: '130px',
        }}
        disableElevation
        onClick={handleClickCreate}
      >
        Add Nav Items
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
        <Box
          sx={{
            width: '30%',
            alignItems: 'flex-start',
            display: 'flex',
            flexFlow: 'column wrap',
          }}
        >
          {navItems?.length > 0
            ? navItems.map((navItemInstance, index) => (
                <Box
                  key={`key${index}`}
                  sx={{
                    height: '3rem',
                    width: '80%',
                    border: '1px solid',
                    padding: '10px',
                    marginBottom: '5px',
                    display: 'flex',
                    flowDirection: 'row',
                  }}
                >
                  <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
                    {navItemInstance.Heading}
                  </Box>
                  <Box sx={{ alignSelf: 'flex-end', width: '18%' }}>
                    {typeof home !== 'undefined' &&
                    home == navItemInstance?.Heading ? (
                      <HomeIcon
                        sx={{ padding: '3px 0px 0px', float: 'left' }}
                      />
                    ) : null}
                    <IconButton
                      aria-label="settings"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={(e) => handleClick(e, navItemInstance)}
                      sx={{ padding: '3px 0px 0px', float: 'right' }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))
            : null}
        </Box>

        {navItems?.length > 0 ? (
          // <ThemeProvider
          //   theme={theme[`${process.env?.REACT_APP_COMPONENT_THEME}`]}
          // >
          <Box
            sx={{
              width: '70%',
              alignItems: 'flex-end',
              display: 'flex',
              flexFlow: 'row wrap',
              border: '1px  dashed',
              p: 1,
            }}
          >
            {navItems?.length > 0
              ? navItems.map((navItemInstance, index) => (
                  <Box
                    key={`key${index}`}
                    sx={{
                      height: '3rem',
                      width: '10%',
                      padding: '4px',
                    }}
                  >
                    <a
                      href={navItemInstance.URL}
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {' '}
                      {navItemInstance.Heading}
                    </a>
                  </Box>
                ))
              : null}
          </Box>
        ) : // </ThemeProvider>
        null}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '.Platform-x-Menu-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '7px',
          },
          '.Platform-x-Menu-list': {
            borderRadius: '4px',
            boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
            border: 'solid 1px rgba(112, 112, 112, 0.1)',
          },
          '.Platform-x-MenuItem-root': {
            backgroundColor: ThemeConstants.WHITE_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.WHITE_COLOR,
              color: '#fd0c0d',
            },
            paddingLeft: '18px',
            fontSize: {
              xs: ThemeConstants.FONTSIZE_DEFAULT,
              xl: ThemeConstants.FONTSIZE_SM,
            },
          },
        }}
      >
        <MenuItem disableRipple>Rename Menu Item</MenuItem>
        <MenuItem
          disableRipple
          onClick={() => {
            //markAsHompage
            markAsHompage();
            handleCloseDropDown();
          }}
        >
          Mark as Default Page
        </MenuItem>
        <MenuItem disableRipple>Hide Menu Item</MenuItem>
        <MenuItem
          disableRipple
          onClick={() => {
            deleteMenuItem();
            handleCloseDropDown();
          }}
        >
          Remove Menu Item
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorElCreate}
        open={openCreate}
        onClose={handleCloseCreate}
        PaperProps={{ sx: { minWidth: '170px' } }}
        sx={{
          '.Platform-x-Menu-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '7px',
          },
          '.Platform-x-Menu-list': {
            borderRadius: '4px',
            boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
            border: 'solid 1px rgba(112, 112, 112, 0.1)',
          },
          '.Platform-x-MenuItem-root': {
            backgroundColor: ThemeConstants.WHITE_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.WHITE_COLOR,
              color: '#fd0c0d',
            },
            paddingLeft: '18px',
            fontSize: {
              xs: ThemeConstants.FONTSIZE_DEFAULT,
              xl: ThemeConstants.FONTSIZE_SM,
            },
          },
        }}
      >
        <MenuItem
          disableRipple
          onClick={() => {
            handleCloseCreateDropDown();
            setShowLinkPage(true);
          }}
        >
          Page
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={() => {
            handleCloseCreateDropDown();
            setShowLinkExternal(true);
          }}
        >
          Link
        </MenuItem>
      </Menu>
      {showLinkPage ? (
        <PageLinkPopover
          handleClose={handleCloseLinkPage}
          openPageModal
          updateMenuItems={updateMenuItems}
        />
      ) : null}
      {showLinkExternal ? (
        <ExternalLinkModal
          handleClose={handleCloseLinkExternal}
          openPageModal
          updateMenuItems={updateMenuItems}
        />
      ) : null}
    </Box>
  );
};
export default HeaderCreation;
