import { Box, makeStyles } from '@material-ui/core';
import { styled } from '@material-ui/core';
import ThemeConstants from '../../../theme/variable';

export const useStyles = makeStyles((theme) => ({
  listingContainer: {
    backgroundColor: '#f7f7f7',
    padding: '0 15px 15px 15px',
    position: 'relative',
    height: 'calc(100vh - 150px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
    justifyContent: 'space-between',
    [theme.breakpoints.up('xs')]: {
      paddingBottom: '150px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '0',
    },
  },
  galleryContainer: {
    width: '100%',
    height: '100%',
    top: 0,
    right: 0,
    position: 'fixed',
    zIndex: 99,
  },
  desktopContainer: {
    overflowX: 'hidden',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  listHeadContainer: {
    alignItems: 'center',
    padding: '0 25px',
    marginBottom: '14px',
    textTransform: 'capitalize',
    [theme.breakpoints.up('md')]: {
      marginTop: '20px',
    },
    [theme.breakpoints.up(ThemeConstants.EM)]: {
      marginTop: '28px',
    },
  },
  mobileContainer: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  textColor: {
    color: '#89909a',
  },
  noResultsContainer: {
    overflowX: 'hidden',
    overflowY: 'scroll',
    textAlign: 'center',
    marginTop: '10%',
  },
  displayGrid: {
    display: 'Grid',
  },
  gridListContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -10px',
    overflowX: 'hidden',
  },
  playCircleIcon: {
    fontSize: '16px',
    marginRight: '4px',
  },
  listGridContainer: {
    backgroundColor: '#fff',
    borderRadius: '3px',
    border: '1px solid #ced3d9',
    cursor: 'pointer',
    padding: '4px 7px',
  },
  listIcon: {
    verticalAlign: 'middle',
    fontSize: '18px',
  },
  settingsContainer: {
    width: '100%',
    top: 0,
    right: 0,
    position: 'fixed',
    [theme.breakpoints.up('xs')]: {
      height: '100%',
      zIndex: 1,
    },

    [theme.breakpoints.up('md')]: {
      height: 'auto',
      zIndex: 90,
    },
  },
}));
export const VodContainer = styled(Box)({
  backgroundColor: ThemeConstants.WHITE_COLOR,
});
