import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../theme/variable';

export const useStyles = makeStyles((theme) => ({
  switchText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '10px',
  },
  sdContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '10px',
  },
  sdText: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
  },
  iconHover: {
    marginLeft: '10px',
    '&:hover': {
      color: ThemeConstants.NOTIFICATION_ERROR,
    },
  },
  span: {
    display: 'flex',
    alignItems: 'center',
    color: ThemeConstants.BLACK_COLOR,
    opacity: 0.7,
    textTransform: 'capitalize',
  },
  editIcon: {
    marginRight: '2px',
  },
}));
