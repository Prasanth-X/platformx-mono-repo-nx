import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  description: {
    color: '#2D2D39',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 4,
    wordBreak: 'break-word',
  },
  backgroundIconImage: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '130px',
    width: '130px',
    position: 'absolute',
    right: -25,
    bottom: -25,
    opacity: 0.2,
  },
}));
