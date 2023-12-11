import { Grid, Box, Typography } from '@mui/material';
import TitleSubTitle from '../../../components/Common/TitleSubTitle';
import { PropsWithChildren } from 'react';
import SiteCreatetionTitleSubTitle from '../../SiteCreation/SiteCreateTitleSubtitle';
import { useSiteSetiingPanelStyle } from './SiteSettingPanel.style';

interface SiteSettingPanelProp {
  number: string;
  title: string;
  subTitle: string;
  contentContainerSx?: any;
  panelStyle?: any;
  titleStyle?: any;
  tooltipStyle?: any;
  subTitleStyle?: any;
  counterStyle?: any;
}
const SiteSettingPanel = ({
  number,
  title,
  subTitle,
  contentContainerSx = {},
  children,
  panelStyle = {},
  titleStyle = {},
  tooltipStyle = {},
  subTitleStyle = {},
  counterStyle = {},
}: PropsWithChildren<SiteSettingPanelProp>) => {
  const classes = useSiteSetiingPanelStyle({ panelStyle, counterStyle })();
  return (
    <Box className={classes.panelContainer}>
      <Grid container className={classes.panelContent}>
        <Grid md={1} lg={1} sm={1} xs={2} item>
          <Box className={classes.numberBox}>{number}</Box>
        </Grid>
        <Grid item md={10} lg={10} sm={10} xs={10} sx={{ paddingLeft: '20px' }}>
          <SiteCreatetionTitleSubTitle
            title={title}
            subTitle={subTitle}
            subTitleStyle={subTitleStyle}
            tooltipStyle={tooltipStyle}
            titleStyle={titleStyle}
          />
        </Grid>
      </Grid>
      <Box sx={contentContainerSx}>{children}</Box>
    </Box>
  );
};

export default SiteSettingPanel;
