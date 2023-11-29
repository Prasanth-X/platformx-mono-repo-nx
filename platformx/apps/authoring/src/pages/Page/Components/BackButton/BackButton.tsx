import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Typography } from '@mui/material';
import '../PageSettings/PageSettings.css';
import { useStyles } from './BackButton.styles';

const BackButton = ({ setPageId, Title, backTo = 'pageSetting' }) => {
  const classes = useStyles();
  return (
    <Box className={classes.topLeftCta} onClick={() => setPageId(backTo)}>
      <KeyboardArrowLeftIcon />
      <Typography variant='p3semibold'>{Title}</Typography>
    </Box>
  );
};
export default BackButton;
