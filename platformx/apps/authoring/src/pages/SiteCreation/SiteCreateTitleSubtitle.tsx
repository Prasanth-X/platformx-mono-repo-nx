import { Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
type SiteCreatetionTitleSubTitleProps = {
  title: string;
  subTitle: string;
  titleColor?: string;
  subTitleColor?: string;
  toolTipIcon?: any;
  toolTipText?: string;
  titleStyle?: any;
  tooltipStyle?: any;
  subTitleStyle?: any;
};
const SiteCreatetionTitleSubTitle = ({
  title,
  subTitle,
  titleColor = '',
  subTitleColor = '#89909a',
  toolTipIcon = <></>,
  toolTipText = '',
  titleStyle,
  tooltipStyle,
  subTitleStyle,
}: SiteCreatetionTitleSubTitleProps) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          //   variant={titleVarient}
          sx={{ color: titleColor, textTransform: 'capitalize', ...titleStyle }}
        >
          {title}
        </Typography>
        <Tooltip title={toolTipText} placement='top' sx={{ ...tooltipStyle }}>
          {toolTipIcon}
        </Tooltip>
      </Box>
      <Box>
        <Typography
          //   variant={subTitleVarient}
          sx={{ color: subTitleColor, ...subTitleStyle }}
        >
          {subTitle}
        </Typography>
      </Box>
    </Box>
  );
};
export default SiteCreatetionTitleSubTitle;
