import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../theme/variable';

export const useStyles = makeStyles((theme) => ({
  headerwp: {
    borderBottom: '1px solid #D9DBE9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
    position: 'static',
    minHeight: '60px',
    // top: 0,
    // zIndex: 9,
    background: ThemeConstants.WHITE_COLOR,
  },
  leftwp: {
    minWidth: '343px',
    '& button': {
      minWidth: '35px',
      padding: '10px',
    },
    [`@media(max-width:${ThemeConstants.LG}px)`]: {
      minWidth: 'auto',
    },
  },
  rightwp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    whiteSpace: 'nowrap',
  },
  mobHeader: {
    paddingLeft: 0,
    minHeight: '62px'
  },
  timer:{
    display:'flex',
    alignItems: 'center'
  },
  buttonWrapper: {
    '& .iconBtn': {
      minWidth: '0px',
      display: 'flex',
      justifyContent: 'center',
      width: '38px',
      height: '38px',
      alignItems: 'center',
      margin: '0 1px',
      '& span': {
        margin: 0,
      },
      '&:hover': {
        backgroundColor: 'rgba(20, 20, 43, 0.04)',
      },
      '&:disabled': {
        color: '#A0A3BD',
        pointerEvents: 'auto',
      },
    },
  }
}));
