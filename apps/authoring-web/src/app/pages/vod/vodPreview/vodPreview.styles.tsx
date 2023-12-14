import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  previewContainer: {
    display: 'flex',
  },
  backContainer: {
    borderRight: '1px solid #dfe1e3',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  editText: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
    paddingRight: '20px',
  },
  editIcon: {
    paddingRight: '5px',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignSelf: 'center',
    border: '1px solid #ced3d9',
    borderRadius: '24px',
    margin: '10px 0',
    [theme.breakpoints.up('xs')]: {
      marginLeft: '10%',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'calc(50% - 228px)',
    },
  },
}));
