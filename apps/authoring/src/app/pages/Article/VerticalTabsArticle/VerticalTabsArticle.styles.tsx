import { makeStyles } from '@material-ui/core';
// import ThemeConstants from '../../../theme/variable';

export const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: '100px',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '27px',
    },
  },
  tabsProps: {
    backgroundColor: '#ffff',
    zIndex: 99,
    width: '100%',
    borderTop: '1px solid  #CED3D9',
    justifyContent: 'space-evenly',
    [theme.breakpoints.up('sm')]: {
      borderTop: '0px',
      borderRadius: '5px',
      marginTop: '27px',
      backgroundColor: '#F7F7FC',
    },
    '& .Platform-x-Tabs-flexContainer': {
      justifyContent: 'space-between',
    },
  },
  tabProps: {
    fontSize: '14px',
    padding: '0px 20px',
    textTransform: 'none',
    borderRadius: '0px',
    justifyContent: 'space-evenly',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
      alignItems: 'start',
    },
  },
  weight400: {
    fontWeight: 400,
  },
  weight600: {
    fontWeight: 600,
  },
  tabsContainer: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100%',
    padding: '0 20px 0 0',
    zIndex: 99,
    [theme.breakpoints.up('sm')]: {
      position: 'initial',
    },
  },
}));
