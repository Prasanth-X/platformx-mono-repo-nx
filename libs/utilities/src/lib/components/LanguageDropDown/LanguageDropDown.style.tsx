import { makeStyles } from '@mui/styles';

export const useLanguageDropDownStyle = makeStyles((theme) => ({
  dropdownmenu1: {
    '& .dropdownmenu ul:nth-child(3)': {
      overflow: 'visible',
    },
    '& .dropdownmenu ul': {
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '-7px',
        left: '14px',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderRight: '8px solid transparent',
        borderLeft: '8px solid transparent',
        borderBottom: '8px solid #ffffff',
        borderTop: '0',
      },
    },
    // [theme.breakpoints.up('xs')]: {
    //   marginTop: '10px',
    // },
    // [theme.breakpoints.up('md')]: {
    //   marginTop: '20px',
    // },
    // [theme.breakpoints.up('lg')]: {
    //   marginTop: '35px',
    // },
  },
  dropdownmenuItem: {
    minWidth: '230px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '50px !important',
  },
  languageDropdownmenuWrapper: {
    width: '24px',
    height: '24px',
    overflow: 'hidden',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  languageDropdownmenuImg: {
    objectFit: 'cover',
    width: '24px',
    height: '24px',
  },
  dropdownmenuItemImgWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  dropdownmenuItemImgWrap1: {
    width: '24px',
    height: '24px',
    overflow: 'hidden',
    borderRadius: '50%',
    marginRight: '10px',
  },
  dropdownmenuItemImg: {
    objectFit: 'cover',
    width: '24px',
    height: '24px',
  },
  dropdownmenuItemIconWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  dropdownmenuItemIcon: {
    minWidth: 'auto',
  },
}));
