import { makeStyles } from '@material-ui/core';

import ThemeConstants from '../../../../theme/variable';

export const useStyles = makeStyles(() => ({
  onHoverImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',

    position: 'absolute',
    height: '218px',
    top: '135px',
    border: '1px solid #C8D2DD',
    /* Elevation 10 */

    filter: 'drop-shadow(0px 60px 70px rgba(0, 0, 0, 0.08))',
    borderRadius: '5px',
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      width: '389px',
    },
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      width: '90%',
    },
    [`@media (min-width:${ThemeConstants.MD}px)`]: {
      width: '389px',
    },
    [`@media (min-width:${ThemeConstants.LG}px)`]: {
      width: '389px',
    },
  },
}));
