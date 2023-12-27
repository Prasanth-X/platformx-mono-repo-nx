import { Box } from '@mui/material';
import SingleCard from '../ScheduleCard/SingleCard';

const ScheduleCardList = ({ scheduledPages }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        paddingBottom: '10px',
      }}
    >
      {scheduledPages.length > 0 &&
        scheduledPages.map((item, index) => (
          <SingleCard key={index} {...item} />
        ))}
    </Box>
  );
};

export default ScheduleCardList;
