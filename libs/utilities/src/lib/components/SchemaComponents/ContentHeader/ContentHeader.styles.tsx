import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    parentGrid: {
      backgroundColor: '#ffffff',
      padding: '10px',
      margin: '0px',
      display: 'flex',
      alignItems: 'center',
      minHeight: '62px',
    },
    secondGrid: {
      display: 'flex',
      alignItems: 'center',
    },
    divButtonTitle: {
      minWidth: '0px',
      textTransform: 'capitalize',
      '&:hover': { backgroundColor: 'transparent' },
    },

    divSpan: {
      cursor: 'pointer',
      width: '32px',
      height: '32px',
      display: 'flex',
      marginRight: '10px',
    },
    secondButtonDiv: {
      display: 'flex',
      padding: '10px',
      minWidth: 'auto',
      '& span': {
        margin: 0,
      },
    },
    divThirdButton: {
      display: 'flex',
      padding: '10px',
    },
  };
});
