import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';

export const useStyles = makeStyles(() => ({
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
  TabButtons: {
    width: '100%',
    border: 0,
    minHeight: '42px !important',
    '& button': {
      color: '#14142B',
      padding: 0,
      minHeight: '42px',
      minWidth: '50%',
      fontSize: '14px',
      textTransform: 'capitalize',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderBottom: '2px solid #D7ECFD',
      [`@media(max-width:${ThemeConstants.SM}px)`]: {
        borderBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
      '&:last-child': {
        justifyContent: 'center',
      },
      '& img': {
        marginRight: '12px',
        [`@media(max-width:${ThemeConstants.SM}px)`]: {
          marginRight: 0,
          marginBottom: '7px',
        },
      },
      '&.Mui-selected': {
        fontWeight: 600,
        borderColor: '#4B9EF9',
      },
    },
  },
  tabPanelSettingPage: {
    padding: 0,
    height: 'calc(100vh - 160px) !important',
  },
  tabButtonsBottom: {
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      background: ThemeConstants.WHITE_COLOR,
      padding: '10px 15px',
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    },
  },
}));
