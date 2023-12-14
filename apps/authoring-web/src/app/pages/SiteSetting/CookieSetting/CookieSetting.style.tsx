import { makeStyles } from '@material-ui/core';
import { ThemeConstants } from '@platformx/utilities';

// [theme.breakpoints.up('xs')]: {

// },
// [theme.breakpoints.up('sm')]: {

// },
// [theme.breakpoints.up('md')]: {

// },
// [theme.breakpoints.up('lg')]: {

// },

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#E2E2E2',
    padding: '20px 20px 0 20px',
    maxHeight: 'calc(100vh - 70px)',
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('xs')]: {
      padding: '0 14px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0',
    },
  },
  panelHeader: { lineHeight: '47px' },
  saveBtn: {
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: 'black',
    height: '47px',
    width: '83px',
  },
  informativeContentContainer: {
    backgroundColor: 'white',
    // padding: '40px',
    borderRadius: '5px',
  },
  cookieInput: {
    boxShadow: 'none',
  },
  leftGridItem: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '24px !important',
    [theme.breakpoints.up('xs')]: {
      paddingRight: '10px',
      // marginTop: '24px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: '10px',
      // marginTop: '40px',
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: '55px',
    },
  },
  rightGridItem: {
    fontSize: '16px',
    marginTop: '14px !important',
    // [theme.breakpoints.up('xs')]: {
    //   marginTop: '30px',
    // },
    // [theme.breakpoints.up('sm')]: {
    //   marginTop: '15px',
    // },
  },
  consentPanel: {
    backgroundColor: 'white',
    // padding: '40px',
    borderRadius: '5px',
  },
  pageContainer: {
    [theme.breakpoints.up('xs')]: {
      padding: '15px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0',
    },
  },
  contentContainer: {
    maxWidth: '820px',
    margin: 'auto',
  },
  textboxStyle: {
    borderRadius: '5px',
    fontFamily: 'Inter !important',
    fontStyle: 'normal',
    height: '57px',
  },
  placeholderStyle: {
    top: '4px',
    left: '9px',
    fontFamily: 'Inter',
    fontSize: '14px',
    color: '#6E7191',
  },
  informativeLeft: {
    [theme.breakpoints.up('xs')]: {
      paddingRight: '0',
      borderRight: '0',
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: '32px',
      borderRight: '1px solid #D9DBE9',
    },
  },
  informativeSkeleton: {
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  informativeSkeletonContainer: {
    padding: '15px 0 15px 32px',
  },
  informativeSkeletonTitle: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
    fontSize: ThemeConstants.FONTSIZE_H7,
    lineHeight: ThemeConstants.LINE_HEIGHT_H6,
    color: '#6E7191',
  },

  previewContainer: {
    // display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' },
    width: '100%',
    borderTop: '1px solid #D9DBE9',
    marginTop: '25px',
    paddingTop: '25px',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));
