import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Box } from '@mui/material';
import { useStyles } from './Header.styles';

const NotificationBox = () => {
  const classes = useStyles();
  return (
    <Box className={`${classes.notificationContainer} notificationIcon`}>
      <NotificationsNoneIcon />
      <Box className='valuebox'>4</Box>
    </Box>
  );
};

export default NotificationBox;
