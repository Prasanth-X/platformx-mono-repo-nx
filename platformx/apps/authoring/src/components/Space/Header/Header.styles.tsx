import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    '&.main-container': {
      backgroundColor: '#ffffff',
      padding: '10px',
      margin: '0px',
      display: 'flex',
      alignItems: 'center',
      minHeight: '62px',
      '& .gridItemTitle': {
        display: 'flex',
        alignItems: 'center',
        '& .gridItemTitleButton': {
          minWidth: '0px',
          textTransform: 'capitalize',
          '&:hover': { backgroundColor: 'transparent' },
        },
      },
      '& .desktopSubmitButton': {
        [theme.breakpoints.up('xs')]: {
          display: 'none',
        },
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
        },
        alignItems: 'center',
        '& .desktopsaveButton': {
          marginLeft: '10px',
          marginRight: '10px',
          height: '40px',
          textTransform: 'capitalize',
          '&:disabled': {
            fontSize: '16px',
          },
          '& span': {
            marginLeft: '0px',
            marginRight: '0px',
          },
        },
      },
      '& .mobileSubmitButton': {
        [theme.breakpoints.up('xs')]: {
          display: 'flex',
        },
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
        '& .individualButton': {
          minWidth: '0px',
        },
      },
    },
  },
}));
