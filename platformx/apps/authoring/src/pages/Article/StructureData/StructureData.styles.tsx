import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container: {
    border: '1px solid #89909a',
    borderRadius: '5px',
    margin: '20px 0',
  },
  containerHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '12px 15px',
  },
  containerContent: {
    borderTop: '1px solid #89909a',
  },
  flexBox: {
    display: 'flex',
  },
  copyIcon: {
    marginRight: '20px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  checkIcon: {
    cursor: 'pointer',
    fontSize: '14px',
  },
}));
