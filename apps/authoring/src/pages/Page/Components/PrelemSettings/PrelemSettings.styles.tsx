import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';

export const useStyles = (props = '') =>
  makeStyles(() => ({
    blackRoundIcon: {
      margin: '0px 8px',
      borderRadius: '50%',
      backgroundColor: ThemeConstants.BLACK_COLOR,
      width: props === 'summary' ? '25px' : '40px',
      height: props === 'summary' ? '25px' : '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& svg': {
        color: ThemeConstants.WHITE_COLOR,
        fontSize: props === 'summary' ? '12px' : '25px',
      },
    },
    imageBoxInner: {
      position: 'absolute',
      top: '0',
      width: props === 'summary' ? '60%' : '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#cecece45',
    },
    imageBox: {
      position: 'relative',
      display: 'flex',
      marginBottom: '16px',
      '& img': {
        width: '100%',
        height: '250px',
      },
    },
    uploadImageBox: {
      borderRadius: '5px',
      border: `dashed 1px #D9DBE9`,
      padding: '20px',
      cursor: 'pointer',
      height: '147px',
      backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
      display: 'flex',
      justifyContent: 'center',
    },
    TwiterInfoBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${ThemeConstants.LIGHT_BG_COLOR}`,
      borderRadius: '9px 0px 0px 9px',
      width: '60%',
    },
    TwiterInfoImageBox: {
      display: 'flex',
      borderRadius: '10px',
      boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
      backgroundColor: ThemeConstants.WHITE_COLOR,
      position: 'relative',
    },
    imageTitle: {
      width: '40%',
      wordBreak: 'break-all',
    },
  }));
