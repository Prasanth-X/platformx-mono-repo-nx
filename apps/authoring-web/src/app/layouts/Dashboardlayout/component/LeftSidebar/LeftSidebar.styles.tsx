import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
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

    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
  },
  logo: {
    cursor: 'pointer',
  },
}));
