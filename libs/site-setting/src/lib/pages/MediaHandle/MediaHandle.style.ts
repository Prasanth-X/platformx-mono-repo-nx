import { makeStyles } from '@material-ui/core';
import {
  ThemeConstants,
} from '@platformx/utilities';

// [theme.breakpoints.up('xs')]: {

// },
// [theme.breakpoints.up('sm')]: {

// },
// [theme.breakpoints.up('md')]: {

// },
// [theme.breakpoints.up('lg')]: {

// },
export const userMediaHanleStyle = makeStyles((theme) => ({
  pageContainer: {
    backgroundColor: ThemeConstants.WHITE_COLOR,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'left',
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  contentContainer: {
    backgroundColor: ThemeConstants.WHITE_COLOR,
    padding: '20px',
    border: '1px solid #D9DBE9',
    margin: 'auto',
    maxWidth: '816px',
    borderRadius: '5px',
    marginTop: '26px',
    height: 'calc(100vh - 160px)',
    overflow: 'scroll'
  },
  switchBox: {
    display: 'flex',
    alignItems: 'center',
    order: 1,
  },

  mediaTitle: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
      order: 1,
    },
    [theme.breakpoints.up('sm')]: {
      order: 2,
      marginLeft: '20px',
    },
  },

  right: {
    display: 'flex',
    justifyContent: 'center',
    alightItems: 'center',
  },

  pictureBox: {
    height: '48px',
    width: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    backgroundColor: '#EFF0F6',
    cursor: 'pointer',
  },

  textBox: {
    width: 'calc(100% - 68px)',
    marginLeft: '11px',
  },

  galleryBox: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 1000,
  },
}));
