import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { Box, Typography } from '@mui/material';
const WarningToast = ({ title = 'title', description = 'description' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Box>
        <ReportProblemOutlinedIcon
          style={{ color: '#E2AB30', marginRight: 2 }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          marginLeft: '10px',
        }}
      >
        <Typography variant='h7bold' sx={{ color: '#E2AB30' }}>
          {title}
        </Typography>
        <Typography
          variant='h7regular'
          sx={{ color: 'black', fontWeight: 400 }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
export default WarningToast;
