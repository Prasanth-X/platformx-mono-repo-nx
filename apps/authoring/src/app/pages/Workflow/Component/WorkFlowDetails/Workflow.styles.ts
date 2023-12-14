import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(() => ({
  contentStyle: {
    display: 'flex',
    background: '#FFFFFF',
    alignItems: 'center',
    marginTop: '15px',
    position: 'relative',
  },
  dFlexItemCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
