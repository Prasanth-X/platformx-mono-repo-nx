import { Grid, Link, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { styled } from '@mui/system';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';

export const useEmptyResultStyle = makeStyles((theme) => ({
  noresult: {
    fontSize: '24px',
    fontFamily: 'inter',
    fontStyle: 'normal',
    lineHeight: '34px',
    fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,


  },
  creathide: {
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  pagecontent: {
    fontFamily: 'inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',


  },
  emptysite: {
    textAlign: 'center',
    marginTop: '5%'

  },
  nofilter: {
    marginTop: '8px',
  },
  typonew: {
    textAlign: 'center',
    marginTop: '7px'
  },
  addbutton: {
    padding: ' 9px 16px',
    fontFamily: 'HCLTech Roobert',
    fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    bottom: '5px',
    right: '5px',
    border: '0',
    [theme.breakpoints.up('xs')]: {
      height: '56px',
      width: '56px',
      borderRadius: '50%',
      position: 'fixed',
      backgroundColor: '#A0A3BD',
      minWidth: 'unset',
    },
    [theme.breakpoints.up('sm')]: {
      height: '38px',
      width: 'fit-content',
      borderRadius: '5px',
      position: 'static',
      backgroundColor: '#14142B',
      minWidth: 'inherit',
    },



  }
}));