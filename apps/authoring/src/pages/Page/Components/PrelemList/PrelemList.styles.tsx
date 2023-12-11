import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';

export const useStyles = makeStyles(() => ({
  prelemboxwp: {
    border: '1px solid #D9DBE9',
    width: 'calc(50% - 15px)',
    margin: '7.5px',
    display: 'inline-flex',
    maxHeight: '300px',
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    transition: 'all 0.5s',
    float: 'left',
    [`@media(max-width:${ThemeConstants.MD}px)`]: {
      maxHeight: '145px',
    },
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      maxHeight: '190px',
    },
    [`@media(max-width:${ThemeConstants.EM - 1}px)`]: {
      width: 'calc(100% - 15px)',
    },
    '& img': {
      height: '300px',
      margin: 'auto',
      maxWidth: '100%',
      objectFit: 'contain',
      [`@media(max-width:${ThemeConstants.MD}px)`]: {
        height: '145px',
      },
      [`@media(max-width:${ThemeConstants.SM}px)`]: {
        height: '190px',
      },
    },
  },
  overlay: {
    position: 'absolute',
    left: '0',
    top: '0',
    background:
      'linear-gradient(0deg, #000000 20.5%, rgba(45, 45, 57, 0) 89.96%)',
    width: '100%',
    height: '100%',
    color: '#fff',
    display: 'flex',
    alignItems: 'flex-end',
    textAlign: 'left',
    transition: 'all 0.5s',
    opacity: 0,
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      opacity: 1,
    },
    '&:hover': {
      opacity: 1,
    },
  },
  contentwp: {
    color: '#fff',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '15px',
  },
  listBox: {
    marginLeft: '-7.5px',
    marginRight: '-7.5px',
    marginTop: '10px',
  },
  buttonswp: {
    marginTop: '15px',
  },
  linetrancate2line: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  iButton: {
    zIndex: 1,
    backgroundColor: ThemeConstants.WHITE_COLOR,
    borderRadius: '5px',
    width: '34px',
    height: '34px',
    margin: '10px',
    display: 'none',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 10px 25px 0px rgba(0, 0, 0, 0.12)',
    top: 0,
    right: 0,
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      display: 'flex',
    },
  },
  iconButton: {
    padding: '5px',
  },
}));
