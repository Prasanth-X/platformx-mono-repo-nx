import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'space-between',
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  notificationContainer: {
    position: 'relative',
    color: '#14142b',
    display: 'none',
    alignTtems: 'center',
    [theme.breakpoints.up('xs')]: {
      margin: '0 10px',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 30px',
    },
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '17px',
    minHeight: '62px',
    paddingLeft: '0px',
  },
  logo: {
    cursor: 'pointer',
  },
}));
