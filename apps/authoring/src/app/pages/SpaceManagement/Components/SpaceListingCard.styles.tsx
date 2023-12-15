import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => {
  return {
    container: {
      '&.main-container': {
        '& .leftGrid': {
          paddingRight: '20px',
        },
      },
    },
  };
});
