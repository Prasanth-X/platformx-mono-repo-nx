import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { StepIconProps } from '@mui/material/StepIcon';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import CompletedIcon from '../../../assets/svg/WorkflowHistory/completed.svg';
import { getStepperCount } from '../../WorkflowStepper/Utils/helper';
import StepperLabel from '../StepperLabel/StepperLabel';
import { icons } from '../Utils/helper';
import {
  StyledConnector,
  StyledStepIcon,
  useStyles,
} from './WorkflowStages.styles';
import { StepperProps, WorkflowStagesProps } from './WorkflowStages.types';

function GetStepIcon(props: StepIconProps, role: string) {
  const { active, completed, className } = props;
  return (
    <StyledStepIcon ownerState={{ active, completed }} className={className}>
      {completed ? (
        <img src={CompletedIcon} alt={role.slice(0, 1)} />
      ) : (
        <img src={icons[String(role.toLowerCase())]} alt={role.slice(0, 1)} />
      )}
    </StyledStepIcon>
  );
}

export default function WorkflowStages({ stages }: WorkflowStagesProps) {
  const [steps, setSteps] = useState<StepperProps[]>([]);
  const theme = useTheme();
  const classes = useStyles();
  const ifTab = useMediaQuery(theme.breakpoints.up('sm'));

  const getBreakPoint = () => {
    return ifTab;
  };

  useEffect(() => {
    setSteps(stages || []);
  }, [stages]);

  return (
    <Stepper
      alternativeLabel={getBreakPoint() ? true : false}
      activeStep={getStepperCount(steps)}
      connector={<StyledConnector />}
      orientation={getBreakPoint() ? 'horizontal' : 'vertical'}
    >
      {steps.map((step, index) => (
        <Step key={step.role}>
          <StepLabel
            className={classes.labelContainer}
            StepIconComponent={(stepIconProps) =>
              GetStepIcon(stepIconProps, step.state)
            }
          >
            <StepperLabel
              index={index + 1}
              role={step.role}
              status={step.status}
              user_name={step.user_name}
            />
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
