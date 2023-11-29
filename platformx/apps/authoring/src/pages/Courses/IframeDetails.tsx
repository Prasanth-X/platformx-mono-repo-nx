import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/material';
import { useCustomStyle } from './Course.Styles';
import { IframeDetailsProps } from './IframeDetails.types';

export const IframeDetails = ({ returnBack }: IframeDetailsProps) => {
  const classes = useCustomStyle();

  return (
    <Box className={classes.container}>
      <Box className={classes.arrowBackIframe} onClick={returnBack}>
        <ArrowBackIcon />
      </Box>
      <iframe
        src={process.env.REACT_APP_CREATE_COURSE_URL}
        sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
        width='100%'
        frameBorder='0'
        style={{ height: '100vh' }}
      />
    </Box>
  );
};
