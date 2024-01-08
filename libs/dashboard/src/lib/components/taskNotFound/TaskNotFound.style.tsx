import { makeStyles } from '@mui/styles';
import useTheme from '@mui/material/styles/useTheme';

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    taskNotFoundWp: {
      '&.taskNotFoundWp': {
        '& .contentWpBox': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          [theme.breakpoints.down('em')]: {
            flexDirection: 'column',
            textAlign: 'center',
            paddingBottom: '15px',
          },
          '& .imgboxWp': {
            width: '100px',
            height: '100%',
            marginRight: '20px',
            [theme.breakpoints.down('em')]: {
              marginRight: '0px',
            },
          },
        },
      },
    },
  };
});
