import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';

export const useStyles = makeStyles(() => ({
  previewBox: {
    padding: 0,
    margin: '30px auto',
    maxWidth: '1366px',
  },
  webBox: {
    borderRadius: '40px',
    border: '1px solid #D9DBE9',
    padding: '15px !important',
    width: '100%',
    margin: 'auto',
    height: 'auto!important',
    [`@media(max-width:${ThemeConstants.EM}px)`]: {
      overflow: 'auto',
    },
  },
  webinner: {
    border: '1px solid #D9DBE9',
    borderRadius: '30px',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    [`@media(max-width:${ThemeConstants.EM}px)`]: {
      width: '1366px',
    },
  },
  tabBox: {
    borderRadius: '34px',
    border: '1px solid #D9DBE9',
    padding: '10px !important',
    width: '792px',
    margin: 'auto',
    height: 'auto!important',
    overflow: 'auto',
    [`@media(max-width:${ThemeConstants.EM}px)`]: {
      width: '100%',
    },
  },
  tabinner: {
    border: '1px solid #D9DBE9',
    borderRadius: '24px',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    [`@media(max-width:${ThemeConstants.EM}px)`]: {
      width: '992px',
    },
    [`@media(max-width:${ThemeConstants.MD}px)`]: {
      width: '792px',
    },
  },
  mobBox: {
    borderRadius: '34px',
    border: '1px solid #D9DBE9',
    padding: '10px !important',
    width: '345px',
    height: 'auto!important',
    overflow: 'auto',
    margin: 'auto',
  },
  mobinner: {
    border: '1px solid #D9DBE9',
    borderRadius: '24px',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
  },
  previewBottomContent: {
    margin: '20px auto',
    maxWidth: '820px',
  },
  devider: {
    border: '1px solid #D9DBE9',
    margin: '40px 0',
    display: 'block',
    width: '100%',
  },
  tagswarp: {
    '& ul': {
      padding: 0,
      '& li': {
        border: '1px solid #14142B',
        borderRadius: '5px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6px 12px',
        margin: '10px 10px 0 0',
      },
    },
  },
  notLoaded: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
}));
