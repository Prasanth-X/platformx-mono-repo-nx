import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    padding: '27px 0px 15px 0px',
  },
  width40: {
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
  width60: {
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
      width: '50%',
    },
  },
  flexBox: {
    display: 'flex',
    marginLeft: '20px',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
  typo: {
    color: '#4B9EF9',
    cursor: 'pointer',
  },
  typoDivider: {
    width: '1px',
    height: '21px',
    flexGrow: 0,
    transform: 'rotate(-180deg)',
    backgroundColor: '#89909a',
    margin: '0 20px',
  },
  sdContainer: {
    padding: '27px 0px 15px 0px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
}));
