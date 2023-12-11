import { makeStyles } from '@material-ui/core';

import ThemeConstants from '../../../../theme/variable';

export const useStyles = makeStyles(() => ({
  plusIconBox: {
    background: ThemeConstants.WHITE_COLOR,
    boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.12)',
    position: 'relative',
    top: '15px',
    left: '20px',
    [`@media (max-width:${ThemeConstants.SM}px)`]: {
      position: 'fixed',
      top: 'auto',
      bottom: '12%',
      left: 'auto',
      right: '5%',
      background: 'transparent',
      boxShadow: 'none',
    },
  },
  iconBoxCta: {
    margin: '10px',
    [`@media (max-width:${ThemeConstants.SM}px)`]: {
      border: '1px solid #D9DBE9',
      boxShadow: '0px 25px 30px rgba(0, 0, 0, 0.05)',
      margin: '5px 3px',
      background: ThemeConstants.WHITE_COLOR,
    },
  },
  trayStyle: {
    backgroundColor: 'white',
    borderRadius: '3px',
    boxShadow: '6px 16px 17px 0 rgba(206, 211, 217, 0.67)',

    [`@media (min-width:${ThemeConstants.LG}px)`]: {
      marginLeft: '10px',
      zIndex: 1,
      position: 'unset',
      right: 'unset',
      bottom: 'unset',
      display: 'flex',
      flexDirection: 'row',
    },

    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      zIndex: 99,
      position: 'fixed',
      right: ' 5%',
      bottom: ' 13%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));
