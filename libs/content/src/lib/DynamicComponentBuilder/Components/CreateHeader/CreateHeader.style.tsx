import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
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
