import { makeStyles } from '@mui/styles';
import useTheme from '@mui/material/styles/useTheme';

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    acceptRejectButtonWrapper: {
      '&.acceptRejectButton': {
        width: '100px',
        height: '32px',
        minWidth: '100px',
        padding: '6px 12px',
        marginRight: '10px',
        [theme.breakpoints.down('em')]: {
          width: '32px',
          minWidth: '32px',
        },
        '& .buttonText': {
          [theme.breakpoints.down('em')]: {
            display: 'none',
          },
        },
        '& .Platform-x-Button-startIcon': {
          [theme.breakpoints.down('em')]: {
            margin: '0px',
          },
        },
      },
    },
  };
});
