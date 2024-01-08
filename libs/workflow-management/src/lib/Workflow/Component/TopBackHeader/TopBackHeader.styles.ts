import { makeStyles } from '@mui/styles';
import { ThemeConstants } from '@platformx/utilities';

export const useStyles = makeStyles(() => ({
  logoDispaly: {
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      display: 'none',
    },
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      display: 'none',
    },
    [`@media (min-width:${ThemeConstants.MD}px)`]: {
      display: 'flex',
    },
  },
  headerTextDispaly: {
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      display: 'flex',
    },
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      display: 'flex',
    },
    [`@media (min-width:${ThemeConstants.MD}px)`]: {
      display: 'none',
    },
  },
}));
