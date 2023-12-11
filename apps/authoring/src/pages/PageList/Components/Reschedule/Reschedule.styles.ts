import { makeStyles } from '@material-ui/core';

import ThemeConstants from '../../../../theme/variable';

export const useStyles = makeStyles(() => ({
  popperStyle: {
    [`@media (max-width:${ThemeConstants.LG}px)`]: {
      height: '50vh',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        width: '0.2em',
        height: '100%',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#606060',
      },
      boxShadow:
        '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    },
  },
}));
