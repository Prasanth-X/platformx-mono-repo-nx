import { Box } from '@mui/material';
import SingleCard from '../scheduleCard/SingleCard';

const ScheduleCardList = ({ scheduledPages }: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        paddingBottom: '10px',
      }}
    >
      {scheduledPages.length > 0 &&
        scheduledPages.map((item: any, index: number) => (
          <SingleCard key={index} {...item} />
        ))}
    </Box>
  );
};

export default ScheduleCardList;
