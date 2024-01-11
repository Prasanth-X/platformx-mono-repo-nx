import { makeStyles } from '@mui/styles';

export const useStyles = (borderType: string) =>
  makeStyles(() => ({
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      borderRadius: 0,
      boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.12)',
    },
    marginZero: {
      margin: '0px',
    },
  }));
