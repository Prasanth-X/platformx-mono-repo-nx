import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import TimerIcon from '../../assets/svg/timerIcon.svg';
const Timer = ({ lastmodifiedDate }) => {
  console.log('lastmodifiedDate', lastmodifiedDate)
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} mr={2}>
      <img src={TimerIcon} />
      <Typography variant='p4regular' ml={1}>
        Last edited: {lastmodifiedDate ? format(new Date(lastmodifiedDate), 'hh:mm a') : null}
      </Typography>
    </Box>
  );
};
export default Timer;
