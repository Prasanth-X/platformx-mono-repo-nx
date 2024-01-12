import Menu, { MenuProps } from '@mui/material/Menu';
import { styled } from '@mui/material/styles';

export const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
        vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
  ))(() => ({
    '.Platform-x-Menu-paper': {
      boxShadow: ' 0px 6px 18px 7px rgba(0, 0, 0, 0.05)',
      borderRadius: '5px',
      marginTop: '5px',
      minWidth: '167px',
      height: 'auto',
      border: '1px solid #E6EAED',
      top:"70px",
    },
    '.Platform-x-MenuItem-root': {
      fontSize: '14px',
      fontWeight: 500,
    },
    '& .Platform-x-Paper-root' : {
        top:"70px !important" ,
        left:"860px !important"
    }
  }));
