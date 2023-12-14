import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { convertToLowerCase, nullToObject } from '../../utils/helperFunctions';

const CommonDesktopDialogBox = (props: any = {}) => {
  const {
    listItem = {},
    arrayData = [],
    listMenu = null,
    openListMenu = false,
    onSelectFilter,
    handleListClose,
  } = nullToObject(props);
  const { t } = useTranslation();
  return (
    <Menu
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      anchorEl={listMenu}
      open={openListMenu}
      onClose={handleListClose}
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
          '.Platform-x-SvgIcon-root': {
            fontSize: 20,
            marginRight: '10px',
            verticalAlign: 'middle',
          },
          fontSize: '16px',
        },
      }}
    >
      {arrayData.map((ele: any, i) => {
        return (
          <MenuItem
            key={convertToLowerCase(`${i}arrayData-CommonDesktopDialogBox`)}
            disableRipple
            onClick={() => onSelectFilter(ele, listItem)}
          >
            <Box
              component='span'
              sx={{
                display: 'block',
                marginTop: '5px',
                marginRight: '0.625rem',
              }}
            >
              {React.cloneElement(ele.icon)}
            </Box>
            <Box component='span' sx={{ display: 'block' }}>
              {t(ele.name.toLowerCase())}
            </Box>
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default React.memo(CommonDesktopDialogBox);
