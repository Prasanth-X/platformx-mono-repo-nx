import { makeStyles } from '@material-ui/core';
import { ThemeConstants } from '@platformx/utilities';

export const useStyles = makeStyles(() => ({
  cardwp: {
    borderRight: '1px solid #D9DBE9',
    borderBottom: '1px solid #D9DBE9',
    width: '50%',
    padding: '10px',
    marginBottom: '0px',
    minHeight: '97px',
    float: 'left',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    cursor: 'pointer',
    [`@media(max-width:${ThemeConstants.SM}px)`]: {
      minWidth: '33.33%',
      maxWidth: '33.33%',
      padding: '5px',
    },
    '&:nth-child(2n)': {
      borderRight: '0',
      [`@media(max-width:${ThemeConstants.SM}px)`]: {
        borderRight: '1px solid #D9DBE9',
      },
    },
  },
  img: {
    display: 'flex',
    marginBottom: '6px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '48px',
    overflow: 'hidden',
    '& img': {
      maxWidth: '100%',
      height: '48px',
    },
  },

  textTypo: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
  },
}));
