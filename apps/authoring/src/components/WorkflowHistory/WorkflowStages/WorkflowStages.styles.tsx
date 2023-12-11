import { makeStyles } from '@material-ui/core';
import StepConnector from '@material-ui/core/StepConnector';
import { withStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import ThemeConstants from '../../../theme/variable';

export const StyledConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 25,
    left: 'calc(-50% + 45px)',
    right: 'calc(50% + 45px)',
  },
  active: { '& $line': { borderColor: ThemeConstants.SECONDRY_COLOR[500] } },
  completed: { '& $line': { borderColor: ThemeConstants.SUCCESS_COLOR[700] } },
  disabled: { '& $line': { borderColor: ThemeConstants.PRIMARY_COLOR[400] } },
  line: {
    borderTopWidth: 4,
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      borderRadius: '0px',
    },
  },
  vertical: {
    marginLeft: '0',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16%',
    },
  },
  lineVertical: {
    borderLeftWidth: 2,
  },
}))(StepConnector);

export const StyledStepIcon = styled('div')<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ theme, ownerState }) => ({
  alignItems: 'center',
  color: ThemeConstants.PRIMARY_COLOR[600],
  backgroundColor: ThemeConstants.PRIMARY_COLOR[400],
  display: 'flex',
  height: 22,
  padding: '30px 20px',
  margin: '0px 20px',
  borderRadius: '50%',
  ...(ownerState.active && {
    color: ThemeConstants.WHITE_COLOR,
    backgroundColor: ThemeConstants.SECONDRY_COLOR[500],
    img: {
      filter: 'brightness(0) invert(1)',
    },
  }),
  ...(!ownerState.active &&
    !ownerState.completed && {
      img: {
        filter: 'brightness(0) invert(65%)',
      },
    }),
  ...(ownerState.completed && {
    backgroundColor: 'transparent',
    margin: '0',
  }),
}));

export const useStyles = makeStyles((theme) => ({
  labelContainer: {
    [theme.breakpoints.down(ThemeConstants.SM)]: {
      alignItems: 'flex-start',
    },
  },
}));
