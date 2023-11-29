import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  LoaderMainBox: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 9,
    width: '100%',
    height: '100%',
    background: 'rgba(255,255,255,0.9)',
  },
  ImageBox: {
    caretColor:'transparent',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'inline-flex',
  },
 
}));
