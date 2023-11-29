import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => {
  return {
    container: {
      '&.main-container': {
        '& .spaceHeader': {
          [theme.breakpoints.up('xs')]: {
            padding: '10px',
          },
          [theme.breakpoints.up('md')]: {
            padding: '20px 20px 0 20px',
          },
        },
        '& .spaceListing': {
          height: 'calc(100vh - 140px)',
          overflowY: 'auto',
          '& .spacelistCard': {
            [theme.breakpoints.up('xs')]: {
              padding: '10px',
            },
            [theme.breakpoints.up('md')]: {
              padding: '20px 20px 0 20px',
            },
          },
        },
      },
    },
  };
});
