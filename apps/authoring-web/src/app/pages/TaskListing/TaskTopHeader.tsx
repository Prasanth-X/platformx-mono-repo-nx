import AddIcon from '@mui/icons-material/Add';

import { Box, Button, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

// import SearchBox from '../Users/SearchBox';

const TaskTopHeader = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Box className='userlisttophead'>
      <Box>
        <Box
          className='d-flex align-items-center'
          sx={{ mb: { xs: '15px', md: 0 } }}
        >
          <Typography variant='h3bold' sx={{ textTransform: 'capitalize' }}>
            {t('Tasks')}
          </Typography>
        </Box>
      </Box>

      <Box
        className='d-flex align-items-center mobalignment'
        sx={{
          position: 'relative',
        }}
      >
        <Typography>Actions</Typography>
      </Box>
    </Box>
  );
};

export default TaskTopHeader;
