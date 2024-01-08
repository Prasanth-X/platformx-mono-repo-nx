import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useSitesMenuStyle = makeStyles((theme: Theme) => ({
  box: {
    display: 'flex',
    marginTop: '10px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.up('xs')]: {
      flexDirection: 'row-reverse',
    },
  },

  dropdowncontain: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '50px',
    borderRadius: '5px',
    background: '#F3FAFF',
    padding: '10px 6px 10px 6px',
    cursor: 'pointer',
    margin: '0 18px',
    alignItems: 'center',
  },
  dropdowntypo: {
    marginTop: '2px',
    overflow: 'hidden',
    textTransform: 'capitalize',
    textOverflow: 'ellipsis',
  },
  dropNewTypo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dropdownimg: {
    width: '11px',
  },

  UserAvatar: {
    backgroundColor: '#4B9EF9 !important',
    width: '34px !important',
    height: '34px !important',
    textTransform: 'uppercase',
    marginRight: '10px',
  },
}));

export default useSitesMenuStyle;
