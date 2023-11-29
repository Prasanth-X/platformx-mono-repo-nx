import { makeStyles } from '@material-ui/core';

import ThemeConstants from '../../../theme/variable';

export const useStyles = makeStyles(() => ({
  containerStyle: {
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    zIndex: '999',
  },
  logoDispaly: {
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      display: 'none',
    },
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      display: 'none',
    },
    [`@media (min-width:${ThemeConstants.MD}px)`]: {
      display: 'flex',
    },
  },
  headerTextDispaly: {
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      display: 'flex',
    },
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      display: 'flex',
    },
    [`@media (min-width:${ThemeConstants.MD}px)`]: {
      display: 'none',
    },
  },
  contentStyle: {
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      paddingRight: '10px',
    },
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      paddingRight: '10px',
    },
    [`@media (min-width:${ThemeConstants.MD}px)`]: {
      paddingRight: '55px',
    },
    display: 'flex',
    flexDirection: 'row',
    background: '#FFFFFF',
    alignItems: 'center',
    border: '1px solid #D9DBE9',
    borderRadius: '5px',
    // width: '389px',
    height: '50px',
    marginTop: '15px',
    position: 'relative',
  },
  imgUploadBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px 0px 0px 5px',
    width: '89px',
    height: '-webkit-fill-available',
    backgroundColor: '#F7F7FC',
    cursor: 'pointer',
    '& picture': {
      minHeight: '48px',
    },
  },

  heroBannerCloudIconBox: {
    width: '20px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconStyle: {
    position: 'absolute',
    right: 0,
    padding: '5px 10px 5px 5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  workflowIconContainer: {
    display: 'flex',
    padding: '10px',
  },
  workflowIconActive: {
    filter: 'brightness(0) invert(5%)',
    height: '16px',
  },
  workflowIconInactive: {
    filter: 'brightness(0) invert(50%)',
    height: '16px',
  },
  buttonWrapper: {
    '& .iconBtn': {
      minWidth: '0px',
      display: 'flex',
      justifyContent: 'center',
      width: '38px',
      height: '38px',
      alignItems: 'center',
      margin: '0 1px',
      '& span': {
        margin: 0,
      },
      '&:hover': {
        backgroundColor: 'rgba(20, 20, 43, 0.04)',
      },
      '&:disabled': {
        color: '#A0A3BD',
        pointerEvents: 'auto',
      },
    },
  }
}));
