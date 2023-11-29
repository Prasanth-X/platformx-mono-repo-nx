import { makeStyles } from '@material-ui/core';

import ThemeConstants from '../../../../theme/variable';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  PageSettingMenuTabs: {
    padding: '10px 15px',
    display: 'flex',
    flexDirection: 'column',
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      flexDirection: 'column-reverse',
      height: 'calc(100vh - 60px)',
      justifyContent: 'flex-end',
    },
  },
  emptWpBoxInner: {
    background: '#F7F7FC',
    border: '1px solid #EFF0F6',
    borderRadius: '10px',
    width: 'calc(100% - 40px)',
    height: 'calc(100vh - 102px)',
    position: 'absolute',
    left: '0',
    top: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '20px',
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      margin: '5px',
      width: 'calc(100% - 10px)',
      height: 'calc(100vh - 72px)',
    },
  },
  TabButtons: {
    width: '100%',
    border: 0,
    minHeight: '42px !important',
    '& button': {
      color: ThemeConstants.PRIMARY_MAIN_COLOR,
      padding: 0,
      minHeight: '42px',
      fontSize: '14px',
      textTransform: 'capitalize',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      [`@media(max-width:${ThemeConstants.SM}px)`]: {
        borderBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minWidth: '50%',
      },
      '&:last-child': {
        justifyContent: 'center',
      },
      '& img': {
        filter:
          'brightness(0) saturate(100%) invert(75%) sepia(5%) saturate(1021%) hue-rotate(196deg) brightness(88%) contrast(87%)',
        marginRight: '12px',
        [`@media(max-width:${ThemeConstants.SM}px)`]: {
          marginRight: 0,
          marginBottom: '7px',
        },
      },
      '&.Mui-selected': {
        fontWeight: 600,
        color: ThemeConstants.PRIMARY_MAIN_COLOR,
        '& img': {
          filter: 'brightness(0) saturate(100%) invert(13%) sepia(18%)',
        },
      },
    },
  },
  tabPanelSettingPage: {
    padding: 0,
    height: 'calc(100vh - 160px) !important',
  },
  tabButtonsBottom: {
    borderBottom: '0 !important',
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      position: 'fixed',
      bottom: '-4px',
      left: 0,
      width: '100%',
      background: ThemeConstants.WHITE_COLOR,
      padding: '10px 15px',
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      zIndex: '999',
    },
  },
  pageSettingBox: {
    maxHeight: 'calc(100vh - 61px)',
    overflowY: 'auto',
  },
  addEditPrelemBox: {
    width: '100%',
    textAlign: 'center',
    height: 'calc(100vh - 62px)',
    padding: '10px 10px 0 10px',
    overflowX: 'hidden',
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      padding: '10px 0 76px',
    },
    // overflowY: 'scroll',
  },
  addEditPrelemBoxWeb: {
    padding: '15px',
    textAlign: 'center',
  },
  innerBoxWeb: {
    width: '100%',
    background: ThemeConstants.COLOR_N0300,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: ThemeConstants.LIGHT_GRAY_COLOR,
    margin: 'auto',
    textAlign: 'left',
    padding: '2px 2px 15px',
    zIndex: 99,
  },
  addEditPrelemBoxTab: {
    padding: '15px',
    textAlign: 'center',
  },
  innerBoxTab: {
    width: '768px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: ThemeConstants.COLOR_N0300,
    borderRadius: '9px',
    overflow: 'hidden',
    margin: 'auto',
    textAlign: 'left',
    padding: '2px',
  },
  addEditPrelemBoxMob: {
    padding: '15px',
    textAlign: 'center',
  },
  innerBoxMob: {
    width: '360px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: ThemeConstants.COLOR_N0300,
    borderRadius: '9px',
    overflow: 'hidden',
    margin: 'auto',
    textAlign: 'left',
    padding: '2px',
  },
  workflowPage: {
    position: 'relative',
    height: '100vh',
  },
}));
