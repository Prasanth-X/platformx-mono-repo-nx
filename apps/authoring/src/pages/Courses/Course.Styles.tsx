import useTheme from '@mui/material/styles/useTheme';
import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    container: {
      paddingTop: '20px',
    },
    arrowBackIframe: {
      display: 'flex',
      border: '1px solid #d9dbe9',
      borderRadius: '4px',
      width: '40px',
      height: '40px',
      alignContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      marginRight: '20px',
      justifyContent: 'center',
      position: 'absolute',
      left: '5px',
      top: '70px',
      background: ThemeConstants.PRIMARY_MAIN_COLOR,
      [theme.breakpoints.down('lg')]: {
        left: '75px',
      },
    },
  };
});
