import { makeStyles } from '@material-ui/core';
import { ThemeConstants } from '@platformx/utilities';

export const useStyles = makeStyles(() => ({
  leftTop: {
    padding: '15px',
  },
  leftBottom: {
    height: 'calc(100vh - 260px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderTop: '1px solid #D9DBE9',
    borderRight: '1px solid #D9DBE9',
    borderBottom: '1px solid #D9DBE9',
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      height: 'auto',
      overflowY: 'hidden',
      overflowX: 'auto',
      borderTop: '1px solid #D9DBE9',
      borderRight: '0',
      borderBottom: '1px solid #D9DBE9',
      display: 'flex',
      paddingBottom: '10px',
    },
  },
}));
