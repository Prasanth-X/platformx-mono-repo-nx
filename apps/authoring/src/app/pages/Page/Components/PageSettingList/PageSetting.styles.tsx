import { makeStyles } from '@material-ui/core';
import { ThemeConstants } from '@platformx/utilities';

export const useStyles = makeStyles(() => ({
  pageSettingWp: {
    padding: '0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    color: ThemeConstants.BLACK_COLOR_V1,
    justifyContent: 'space-between',
    margin: '15px 0',
    cursor: 'pointer',
    padding: '5px 0',
    '&:hover': {
      color: '#4B9EF9',
    },
    '&:hover img': {
      filter:
        'invert(58%) sepia(98%) saturate(2289%) hue-rotate(188deg) brightness(100%) contrast(96%)',
    },
  },
  leftwp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imgbox: {
    display: 'flex',
    width: '16px',
    marginRight: '20px',
  },
}));
