import { makeStyles } from '@material-ui/core';
import ThemeConstants from '../../../../../theme/variable';

export const useStyles = makeStyles((theme) => ({
  replaceTray: {
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '99%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7470708a',
    cursor: 'pointer',
  },
  chooseTray: {
    borderRadius: '15px',
    cursor: 'pointer',
    height: '206px',
    backgroundColor: '#EFF0F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  cashedContainer: {
    borderRadius: '50%',
    backgroundColor: '#fff',
    width: '25px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  arrowUpContainer: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: ThemeConstants.PRIMARY_MAIN_COLOR,
  },
  blackColor: {
    color: ThemeConstants.BLACK_COLOR,
  },
  whiteColor: {
    color: ThemeConstants.WHITE_COLOR,
  },
}));
