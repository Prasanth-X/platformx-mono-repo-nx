import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../theme/variable';

export const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'initial',
    },
  },
  backIconContainer: {
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    padding: '15px 10px',
    margin: 0,
    width: '100%',
    borderBottom: `1px solid ${ThemeConstants.PRIMARY_COLOR[500]}`,
    [theme.breakpoints.up(ThemeConstants.MD)]: {
      width: '42px',
      border: `1px solid ${ThemeConstants.PRIMARY_COLOR[500]}`,
      margin: '24px 0 0 22px',
      padding: '8px',
    },
  },

  icon: {
    cursor: 'pointer',
  },
}));
