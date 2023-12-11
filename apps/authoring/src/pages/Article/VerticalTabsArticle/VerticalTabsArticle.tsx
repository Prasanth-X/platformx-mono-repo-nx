import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import * as React from 'react';
import AnalyticsIcon from '../../../assets/svg/analytics.svg';
import SeoIcon from '../../../assets/svg/seo.svg';
import SocialShareIcon from '../../../assets/svg/social_share.svg';

import { useTranslation } from 'react-i18next';
import Analytics from '../Analytics/Analytics';
import Seo from '../Seo/Seo';
import SocialShare from '../SocialShare/SocialShare';
import { useStyles } from './VerticalTabsArticle.styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='TabPanel'
      hidden={value !== index}
      id={`vertical-TabPanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function VerticalTabsArticle({
  state,
  setState,
  socialOgTags,
  setSocialOgTags,
  showGallery,
  setOperationType,
  setShow,
  updateStructureDataArticle,
}) {
  const [value, setValue] = React.useState(0);
  const classes = useStyles(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { t } = useTranslation();

  const theme = useTheme();
  const ifTab = useMediaQuery(theme.breakpoints.up('sm'));
  const getBreakPoint = () => {
    return ifTab;
  };
  return (
    <Grid container className={classes.container}>
      <Grid item xs={0} md={3.1} className={classes.tabsContainer}>
        <Tabs
          orientation={getBreakPoint() ? 'vertical' : 'horizontal'}
          value={value}
          onChange={handleChange}
          className={classes.tabsProps}
          TabIndicatorProps={{
            style: { display: 'none' },
          }}
        >
          <Tab
            className={
              `${classes.tabProps}`
              //  ${
              //   value === 0 ? classes.weight600 : classes.weight400
              // }
            }
            sx={{
              textTransform: 'capitalize',
              fontWeight: value === 0 ? 600 : 400,
              textAlign: 'left',
              alignItems: 'flex-start',
            }}
            icon={!getBreakPoint() && <img alt='seo' src={SocialShareIcon} />}
            label={t('page_social_share')}
          />
          <Tab
            className={`${classes.tabProps}`}
            sx={{
              textTransform: 'capitalize',
              fontWeight: value === 1 ? 600 : 400,
              textAlign: 'left',
              alignItems: 'flex-start',
            }}
            icon={!getBreakPoint() && <img alt='seo' src={SeoIcon} />}
            label={t('page_prelem_seo')}
          />
          <Tab
            className={`${classes.tabProps}`}
            sx={{
              textTransform: 'capitalize',
              fontWeight: value === 2 ? 600 : 400,
              textAlign: 'left',
              alignItems: 'flex-start',
            }}
            icon={!getBreakPoint() && <img alt='seo' src={AnalyticsIcon} />}
            label={t('analytics')}
          />
        </Tabs>
      </Grid>
      <Grid item xs={12} md={8.9}>
        <TabPanel value={value} index={0}>
          <SocialShare
            state={state}
            setState={setState}
            socialOgTags={socialOgTags}
            setSocialOgTags={setSocialOgTags}
            showGallery={showGallery}
            setOperationType={setOperationType}
            setShow={setShow}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Seo
            state={state}
            setState={setState}
            updateStructureDataArticle={updateStructureDataArticle}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Analytics state={state} setState={setState} />
        </TabPanel>
      </Grid>
    </Grid>
  );
}
