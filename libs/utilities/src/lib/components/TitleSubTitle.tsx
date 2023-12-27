import { Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';

const TitleSubTitle = ({
  title = '',
  subTitle = '',
  titleVarient,
  subTitleVarient,
  titleColor = '',
  subTitleColor = '#89909a',
  toolTipIcon = <></>,
  toolTipText = '',
}) => {
  return (
    <Box>
      {title && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant={titleVarient}
            sx={{ color: titleColor, textTransform: 'capitalize' }}
          >
            {title}
          </Typography>
          <Tooltip title={toolTipText} placement='top'>
            {toolTipIcon}
          </Tooltip>
        </Box>
      )}
      {subTitle && (
        <Box>
          <Typography variant={subTitleVarient} sx={{ color: subTitleColor }}>
            {subTitle}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default TitleSubTitle;
