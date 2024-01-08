import { makeStyles } from '@mui/styles';
import { ThemeConstants } from '@platformx/utilities';

export const useStyles = makeStyles(() => ({
  contentStyle: {
    // [`@media (min-width:${ThemeConstants.XS}px)`]: {
    //   paddingRight: '10px',
    // },
    // [`@media (min-width:${ThemeConstants.SM}px)`]: {
    //   paddingRight: '10px',
    // },
    // [`@media (min-width:${ThemeConstants.MD}px)`]: {
    //   paddingRight: '55px',
    // },
    display: 'flex',
    background: '#FFFFFF',
    alignItems: 'center',
    // width: 'max-content',

    marginTop: '15px',
    position: 'relative',
  },
  workflowIconStyle: {
    width: '44px',
    height: '44px',
    borderRadius: '5px',
    backgroundColor: '#DEF5D9',
    justifyContent: 'center',
    marginRight: '14px',
    alignItems: 'center',
    '& svg': {
      '& path': {
        fill: '#0FA069',
      },
    },
  },
  dFlexAlignItemCenter: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  onHoverHighlight: {
    '&:hover': {
      textDecoration: 'underline',
      fontWeight: 600,
    },
  },
  stepsEllipsis: {
    flexDirection: 'row',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'block',
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      maxWidth: '100%',
    },
    [`@media (min-width:${ThemeConstants.LG}px)`]: {
      maxWidth: '100%',
    },
  },
  contentTypeBox: {
    padding: '0 20px',
    minWidth: '290px',
    minHeight: '40px',
    borderLeft: '1px solid #ced3d9',
    borderRight: '1px solid #ced3d9',
    maxWidth: '290px',
    flexDirection: 'column',
  },
  contentTypeEllipsis: {
    padding: '2px 0px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  contentTypeTextStyle: {
    color: '#14142B',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));
