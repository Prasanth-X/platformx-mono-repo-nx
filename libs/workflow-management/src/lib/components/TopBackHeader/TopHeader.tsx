import { Box, Typography } from '@mui/material';
import { t } from 'i18next';
const TopHeader = () => {
  return (
    <Box className='userlisttophead'>
      <Box>
        <Box
          className='d-flex align-items-center'
          sx={{ mb: { xs: '15px', md: 0 } }}
        >
          <Typography variant='h3bold' sx={{ textTransform: 'capitalize' }}>
            {t('workflow')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TopHeader;
