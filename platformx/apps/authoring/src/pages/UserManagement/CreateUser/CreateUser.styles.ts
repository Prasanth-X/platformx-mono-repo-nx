import { makeStyles } from '@material-ui/core';

import ThemeConstants from '../../../theme/variable';

export const useStyles = makeStyles(() => ({
  containerStyle: {
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      paddingRight: '10px',
      marginTop: '30px',
    },
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      paddingRight: '10px',
      marginTop: '40px',
    },
    [`@media (min-width:${ThemeConstants.MD}px)`]: {
      paddingRight: '55px',
    },
    display: 'flex',
    flexDirection: 'column',
  },
  contentStyle: {
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      marginTop: '14px',
    },
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      marginTop: '40px',
    },
  },
  roleandperBox: {
    border: '1px solid #D9DBE9',
    margin: '10px',
    borderRadius: '5px',
    padding: '10px',
    minHeight: '100px',
    maxHeight: '100px',
    '& h6': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: '2',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      fontSize: '12px',
      color: '##6E7191',
      lineHeight: '18px',
    },
  },
}));
