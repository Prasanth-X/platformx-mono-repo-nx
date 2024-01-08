import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  contentRowContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 0px',
    borderBottom: '1px solid #CED3D9',
    justifyContent: 'space-between',
    minHeight: '77px',
    '&:last-child': {
      borderBottom: 0,
    },
  },
  contentRowText: {
    cursor: 'pointer',
    paddingRight: '25px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    wordBreak: 'break-all',
    '&:hover': {
      textDecoration: 'underline',
      fontWeight: 600,
    },
  },
}));
