import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  contentRowContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 0px',
    borderBottom: '1px solid #CED3D9',
    justifyContent: 'space-between',
    minHeight: '102px',
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
  arrowIcon: {
    background: '#fff',
    width: '34px',
    height: '34px',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
      background: '#D7ECFD',
    },
  },
  statusPublish: {
    border: '1px solid #5cb85b',
    fontSize: '12px',
    color: '#5cb85b',
    padding: '5px 10px',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: '3px',
  },
  statusDraft: {
    border: '1px solid #f0ad4e',
    fontSize: '12px',
    color: '#f0ad4e',
    padding: '5px 10px',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: '3px',
  },
}));
