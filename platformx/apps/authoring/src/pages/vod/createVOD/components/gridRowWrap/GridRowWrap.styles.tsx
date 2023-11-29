import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  gridWrapRight: {
    [theme.breakpoints.up('xs')]: {
      paddingRight: '10px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: '55px',
    },
  },
}));
