import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import BasicDetails from "./Components/BasicDetails/BasicDetails";
import ProfileDetails from "./Components/ProfileDetails/ProfileDetails";
import { useStyles } from "./MyProfile.style";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: "40px 250px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyProfile = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box className={classes.container}>
        <Grid>
          <Typography variant='h1bold'>My Profile</Typography>
        </Grid>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Profile' {...a11yProps(0)} className={classes.tabContainer} />
          <Tab label='Notifications' {...a11yProps(1)} className={classes.tabContainer} />
          <Tab label='Settings' {...a11yProps(2)} className={classes.tabContainer} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProfileDetails />
        <BasicDetails />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Notifications
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Settings
      </CustomTabPanel>
    </>
  );
};

export default MyProfile;
