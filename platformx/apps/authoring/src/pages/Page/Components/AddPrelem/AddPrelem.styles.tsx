import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../theme/variable';
import { theme } from '../../../vod/vodPreview/utils/constants';

export const useStyles = makeStyles(() => ({
  editPageComonBox: {
    position: 'relative',
    outline: '2px solid transparent',
    marginBottom: '20px',
    marginTop: '20px',
    background: ThemeConstants.WHITE_COLOR,
    '&:hover': {
       outlineColor: ThemeConstants.BLUE_COLOR,
    },
  },
  prelemButtonsWp: {
    background: ThemeConstants.BLACK_COLOR_V1,
    position: 'absolute',
    top: 0,
    left: 0,
    color: ThemeConstants.WHITE_COLOR,
    zIndex: 999,
    [`@media(max-width:${ThemeConstants.EM}px)`]: {
      left: 'auto',
      right: 0,
      top: '10px',
    },
    '& ul': {
      padding: 0,
      margin: 0,
      display: 'flex',
      [`@media(max-width:${ThemeConstants.EM}px)`]: {
        flexDirection: 'column',
      },
      '& li': {
        margin: '5px 2px',
        display: 'flex',
        cursor: 'pointer',
        [`@media(max-width:${ThemeConstants.EM}px)`]: {
          margin: '2px',
        },
        '& svg': {
          fontSize: '20px',
        },
        '&:hover': {
          color: ThemeConstants.PRIMARY_COLOR,
        },
      },
    },
  },
  bottomaddCtaWp: {
    position: 'absolute',
    left: 0,
    bottom: '-15px',
    width: '100%',
    justifyContent: 'center',
    height: '40px',
    zIndex: 99,
    '& button': {
      minWidth: '159px',
      margin: 0,
    }
  },
  topaddCtaWp: {
    position: 'absolute',
    left: 0,
    top: '-25px',
    width: '100%',
    justifyContent: 'center',
    zIndex: 99,
    height: '40px',
    '& button': {
      minWidth: '159px',
      margin: 0,
    }
  },
}));
