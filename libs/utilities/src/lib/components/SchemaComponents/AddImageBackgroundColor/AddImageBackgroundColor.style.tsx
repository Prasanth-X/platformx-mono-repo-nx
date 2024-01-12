import useTheme from '@mui/material/styles/useTheme';
import { makeStyles } from '@mui/styles';
import ThemeConstants from '../../../themes/authoring/lightTheme/lightThemeVariable';

export const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    imageContainer: {
      position: 'relative',
      borderRadius: '15px',
      minHeight: '206px',
      height: '206px',
      '& picture': {
        minHeight: '206px',
      },
    },
    imgStyle: {
      width: '100%',
      height: '206px',
      objectFit: 'cover',
      borderRadius: '15px',
    },
    uploadImgContainer: {
      position: 'absolute',
      top: '0',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#7470708a',
      borderRadius: '15px',
      [`@media (min-width:${ThemeConstants.XS}px)`]: {
        height: '100%',
      },
      [`@media (min-width:${ThemeConstants.LG}px)`]: {
        height: '206px',
      },
    },
    replaceStyle: {
      borderRadius: '50%',
      backgroundColor: '#fff',
      width: '25px',
      height: '25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
    },
    bgColorBoxStyle: {
      width: '100%',
      height: '206px',
      borderRadius: '15px',
    },
    chooseImgBoxStyle: {
      borderRadius: '15px',
      cursor: 'pointer',
      height: '206px',
      backgroundColor: '#EFF0F6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    arrowUpIconStyle: {
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      color: ThemeConstants.PRIMARY_MAIN_COLOR,
    },
    colorPalleteStyle: {
      marginTop: '10px',
      display: 'flex',
      flexDirection: 'row',
    },
    iconBoxStyle: {
      width: '27px',
      height: '27px',
      flexGrow: '0',
      borderRadius: '20px',
      backgroundColor: '#fff',
      border: 'solid 1px #2d2d39',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      [`@media (min-width:${ThemeConstants.XS}px)`]: {
        margin: '0px 8px 8px 0px',
      },
      [`@media (min-width:${ThemeConstants.LG}px)`]: {
        margin: '0px 8px 8px 0px',
      },
    },
    refreshIconStyle: {
      width: '27px',
      height: '27px',
      flexGrow: '0',
      borderRadius: '20px',
      backgroundColor: '#fff',
      border: 'solid 1px #2d2d39',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      [`@media (min-width:${ThemeConstants.XS}px)`]: {
        margin: '0px 8px 8px 0px',
      },
      [`@media (min-width:${ThemeConstants.LG}px)`]: {
        margin: '0px 0px 8px 0px',
      },
    },
    colorBox: {
      width: '27px',
      height: '27px',
      flexGrow: '0',
      borderRadius: '20px',
      cursor: 'pointer',
      [`@media (min-width:${ThemeConstants.XS}px)`]: {
        margin: '0px 8px 8px 0px',
      },
      [`@media (min-width:${ThemeConstants.LG}px)`]: {
        margin: '0px 8px 8px 0px',
      },
    },
  };
});
