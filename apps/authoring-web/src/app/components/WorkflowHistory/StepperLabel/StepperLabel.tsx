import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { StepperProps } from '../WorkflowStages/WorkflowStages.types';
import { useStyles } from './StepperLabel.styles';

function StepperLabel({ index, role, status, user_name }: StepperProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Box className={classes.container}>
      <Box className={classes.innerContainer}>
        <Box>
          <Typography
            variant='h7regular'
            component='h5'
            className={classes.labelOne}
          >
            {`${t('step')} ${index}`}
          </Typography>
        </Box>
        <Box>
          <Typography variant='p2bold' component='h5'>
            {role}
          </Typography>
        </Box>
        <Box className={classes.labelCompleted}>
          <Typography variant='h6regular' component='h5'>
            {status}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant='h7regular'
            component='h5'
            sx={{ color: '#A0A3BD' }}
          >
            {user_name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default StepperLabel;
