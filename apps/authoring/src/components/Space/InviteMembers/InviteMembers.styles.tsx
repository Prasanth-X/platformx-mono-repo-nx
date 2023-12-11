import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    '&.main-container': {
      backgroundColor: '#ffffff',
      marginBottom: '12px',
      [theme.breakpoints.up('xs')]: {
        padding: '15px 14px 13px 14px',
      },
      [theme.breakpoints.up('sm')]: {
        padding: '40px 89px 40px 40px',
      },
      [theme.breakpoints.up('md')]: {
        padding: '40px 89px 40px 40px',
      },
      '& .grid': {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('xs')]: {
          paddingRight: '10px',
        },
        [theme.breakpoints.up('sm')]: {
          paddingRight: '10px',
        },
        [theme.breakpoints.up('md')]: {
          paddingRight: '55px',
        },
        [theme.breakpoints.up('sm')]: {
          marginTop: '40px',
        },
        [theme.breakpoints.up('xs')]: {
          marginTop: '30px',
        },
      },
      '& .margintopClassforInviteMembers': {
        [theme.breakpoints.up('xs')]: {
          marginTop: '14px',
        },
        [theme.breakpoints.up('sm')]: {
          marginTop: '40px',
        },
      },
    },
  },
}));
