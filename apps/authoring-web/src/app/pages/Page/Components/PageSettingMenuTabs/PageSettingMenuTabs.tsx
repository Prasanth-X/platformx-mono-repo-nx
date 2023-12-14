import * as React from 'react';
import { Box, Tab, useMediaQuery } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SettingIcon from '../../../../assets/svg/settingIcon.svg';
import EditIcon from '../../../../assets/svg/editIcon.svg';
import PageSettingList from '../PageSettingList/PageSettingList';
import { useStyles } from './PageSettingMenuTabs.styles';
import { ThemeConstants } from '@platformx/utilities';

const LeftTabs = ({ setPageId }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('Page_Setting');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const DesignTab = useMediaQuery(`@media(max-width:${ThemeConstants.SM}px)`);
  return (
    <Box className={classes.PageSettingMenuTabs}>
      <TabContext value={value}>
        <Box
          className={classes.tabButtonsBottom}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <TabList
            TabIndicatorProps={{
              style: { display: 'none' },
            }}
            className={classes.TabButtons}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            {DesignTab && (
              <Tab
                icon={<img src={EditIcon} alt="icon" />}
                iconPosition="start"
                label="Design"
                value="Page_Design"
              />
            )}
            <Tab
              icon={<img src={SettingIcon} alt="icon" />}
              iconPosition="start"
              label="Page Setting"
              value="Page_Setting"
            />
          </TabList>
        </Box>
        <TabPanel
          sx={{ padding: 0 }}
          className={classes.tabPanelSettingPage}
          value="Page_Design"
        >
          Design
        </TabPanel>
        <TabPanel
          sx={{ padding: 0 }}
          className={classes.tabPanelSettingPage}
          value="Page_Setting"
        >
          <PageSettingList setPageId={setPageId} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default LeftTabs;
