import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  head: {
    border: '1px solid #CED3D9',
    borderRadius: '3px',
  },
  body: {
    overflowY: 'auto',
    maxHeight: '305px',
    minHeight: '305px',
    padding: '0px 24px',
  },
}));
