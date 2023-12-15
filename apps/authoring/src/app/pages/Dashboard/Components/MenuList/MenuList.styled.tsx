import { Menu } from '@mui/material';
import { styled } from '@mui/system';

export const Menus = styled(Menu)(() => ({
  '.Platform-x-Menu-paper': {
    borderRadius: '5px',
    marginTop: '5px',
  },
  '.Platform-x-Menu-list': {
    borderRadius: '4px',
  },
  '.Platform-x-MenuItem-root': {
    '.Platform-x-SvgIcon-root': {
      fontSize: 20,
      marginRight: '10px',
    },
    paddingLeft: '10px',
    fontSize: '14px',
  },
  textTransform: 'capitalize',
}));
