import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  workflowIconContainer: {
    display: 'flex',
  },
  workflowIconActive: {
    filter: 'brightness(0) invert(5%)',
    height: '16px',
  },
  workflowIconInactive: {
    filter: 'brightness(0) invert(50%)',
    height: '16px',
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
  },
}));
