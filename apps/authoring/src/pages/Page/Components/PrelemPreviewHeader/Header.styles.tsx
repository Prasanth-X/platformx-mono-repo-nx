import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';

export const useStyles = makeStyles(() => ({
  prelemPreviewHeader: {
    padding: '0px 15px',
    borderBottom: '1px solid #D9DBE9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: '0',
    background: ThemeConstants.WHITE_COLOR,
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      justifyContent: 'center',
    },
  },
  rightBox: {
    display: 'flex',
    alignItems: 'center',
    '& button': {
      height: '38px',
      marginRight: '20px',
    },
  },
  backbtn: {
    minWidth: '190px',
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      minWidth: 'auto',
      position: 'absolute',
      left: '0px',
    },
    '& button': {
      textTransform: 'capitalize',
    },
  },
  mobButtonsAdd: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '15px',
    background:
      'linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%)',

    '& button': {
      width: '100%',
    },
  },
}));
