import { makeStyles } from '@material-ui/core';
import { ThemeConstants } from '@platformx/utilities';

export const useStyles = makeStyles(() => ({
  PageContainer: {
    display: 'flex',
    overflowY: 'hidden',
    fontFamily: ThemeConstants.PRIMARY_FONT_FAMILY,
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      flexDirection: 'column',
    },
  },
  leftBox: {
    maxWidth: '300px',
    minWidth: '300px',
    borderRight: '1px solid #D9DBE9',
    height: '100vh',
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      width: '100%',
      maxWidth: '100%',
      borderRight: '0',
      height: 'auto',
    },
  },
  logowp: {
    padding: '14px 15px',
    borderBottom: '1px solid #D9DBE9',
    minHeight: '60px',
    '& img': {
      cursor: 'pointer',
    },
  },
  img: {
    cursor: 'pointer',
  },
  rightBox: {
    width: '100%',
    height: '100vh',
    overflowY: 'auto',
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      height: 'auto',
    },
  },
}));
