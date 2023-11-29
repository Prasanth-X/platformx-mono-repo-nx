import { makeStyles } from '@material-ui/core';
import Accordion from '@mui/material/Accordion';
import { styled } from '@mui/system';
import ThemeConstants from '../../../theme/variable';

export const Accordions = styled(Accordion)(() => ({
  boxShadow: 'none',
  borderRadius: '0px',
  '&.Mui-expanded': {
    margin: '0px',
  },
}));
export const useStyles = makeStyles((theme) => ({
  settingsContainer: {
    marginTop: '0',
  },
  settingsContainerLeft: {
    backgroundColor: 'transparent',
  },
  settingsContainerRight: {
    backgroundColor: '#f5f5f5',
  },
  containerHead: {
    padding: '10px 25px 10px 25px',
    backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textTransform: 'uppercase',
    color: ThemeConstants.WHITE_COLOR,
    fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
  },
  closeIcon: {
    color: ThemeConstants.WHITE_COLOR,
    cursor: 'pointer',
  },
  accordionContainer: {
    height: 'calc(100vh - 45px)',
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  accordion: {
    borderRadius: '0px',
  },
  accordionText: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
    [theme.breakpoints.up('xs')]: {
      fontSize: ThemeConstants.FONTSIZE_DEFAULT,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: ThemeConstants.FONTSIZE_MD,
    },
  },
  icons: {
    color: ThemeConstants.BLACK_COLOR,
    cursor: 'pointer',
    marginRight: '10px',
  },
}));
