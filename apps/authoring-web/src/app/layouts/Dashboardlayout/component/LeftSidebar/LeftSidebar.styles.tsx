import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  logoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '17px',
    borderBottom: '1px solid #D9DBE9',
    minHeight: '62px',
  },
  closeIcon: {
    cursor: 'pointer',
    color: '#89909A',
    fontSize: '20px',

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logo: {
    cursor: 'pointer',
  },
}));
