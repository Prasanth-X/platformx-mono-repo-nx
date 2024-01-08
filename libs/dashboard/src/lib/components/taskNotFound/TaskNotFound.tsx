import { Box, Typography } from '@mui/material';
import { TaskNotFoundIcon } from '@platformx/utilities';
import { useCustomStyle } from './TaskNotFound.style';
import { useTranslation } from 'react-i18next';

const TaskNotFound = () => {
  const classes = useCustomStyle();
  const { t } = useTranslation();
  return (
    <Box className={`${classes.taskNotFoundWp} taskNotFoundWp`}>
      <Box className='contentWpBox'>
        <Box className='imgboxWp'>
          <img src={TaskNotFoundIcon} alt='Task Not Found' />
        </Box>
        <Typography variant='p2regular'>{t('task_not_found')}</Typography>
      </Box>
    </Box>
  );
};

export default TaskNotFound;
