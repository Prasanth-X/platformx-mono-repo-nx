import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../theme/variable';

export const useStyles = makeStyles(() => ({
  topLeftCta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    '&:hover': {
      color: ThemeConstants.PRIMARY_COLOR,
    },
    '& svg':  {
      fontSize: ThemeConstants.FONTSIZE_28,
      marginRight: '2px',
      marginLeft: '-10px',
    }
  }
}));
