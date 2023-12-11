import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';

export const useStyles = makeStyles(() => ({
  analyticsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20x',
    marginBottom: '10px',
  },
  analyticsText: {
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
  doneButton: {
    textAlign: 'right',
    marginTop: '20x',
    marginBottom: '20px',
  },
}));
