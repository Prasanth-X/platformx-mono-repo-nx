import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#E2E2E2',
    padding: '20px 20px 0 20px',
    maxHeight: 'calc(100vh - 70px)',
    overflow: 'auto',
  },

  informativeContentContainer: {
    backgroundColor: 'white',
    borderRadius: '5px',
  },

  pageContainer: {
    [theme.breakpoints.up('xs')]: {
      padding: '1px 15px 15px 15px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0',
    },
  },
  contentContainer: {
    maxWidth: '820px',
    margin: 'auto',
    marginBottom: '10px'
  },

  subtitle: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingTop: '5px',
  },
  subtitle2:{
    paddingTop: '5px',
    textTransform: 'capitalize'
  }
}));
