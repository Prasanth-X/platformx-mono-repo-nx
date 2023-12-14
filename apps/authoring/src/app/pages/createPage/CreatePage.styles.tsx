import { makeStyles } from '@material-ui/core';

import { ThemeConstants } from '@platformx/utilities';

export const useStyles = makeStyles(() => ({
  PageDialogCloseButton: {
    backgroundColor: ThemeConstants.WHITE_COLOR,
    color: ThemeConstants.BLACK_COLOR,
    '&:hover': {
      backgroundColor: ThemeConstants.WHITE_COLOR,
      color: ThemeConstants.BLACK_COLOR,
    },
    minWidth: '130px',
    marginRight: '20px',
    border: '1px solid #000000',
    textTransform: 'capitalize',
  },
  PageDialogDoneButton: {
    backgroundColor: ThemeConstants.BLACK_COLOR,
    color: ThemeConstants.WHITE_COLOR,
    '&:hover': {
      backgroundColor: ThemeConstants.BLACK_COLOR,
      color: ThemeConstants.WHITE_COLOR,
    },
    minWidth: '130px',
    textTransform: 'capitalize',
  },
  createPagePopupLeft: {
    padding: '17px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    [`@media(max-width:${ThemeConstants.MD}px)`]: {
      padding: '15px',
    },
  },
  createPagePopuprowBox: {
    margin: '13px 0',
  },
  createPagePopupButtonWp: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '13px 0',
    '& button': {
      width: '50%',
      height: '47px',
      '&:first-child': {
        marginRight: '15px',
      },
    },
  },
  createPagePopupRight: {
    background: '#D7ECFD',
    minHeight: '450px',
    [`@media(max-width:${ThemeConstants.MD}px)`]: {
      minHeight: 'auto',
    },
  },
  popupRightImage: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [`@media(max-width:${ThemeConstants.MD}px)`]: {
      padding: '25px 0px 25px 25px',
    },
  },
}));
