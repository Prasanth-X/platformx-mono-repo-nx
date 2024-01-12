import useTheme from '@mui/material/styles/useTheme';
import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    container: {
      marginTop: '10px',
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('lg')]: {
        flexFlow: 'wrap',
      },
      [theme.breakpoints.up('lg')]: {
        flexFlow: 'nowrap',
      },
    },
    innerContainer: {
      width: '27px',
      height: '27px',
      flexGrow: '0',
      borderRadius: '20px',
      backgroundColor: '#fff',
      border: 'solid 1px #ced3d9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      margin: '0px 8px 8px 0px',
    },
  };
});
