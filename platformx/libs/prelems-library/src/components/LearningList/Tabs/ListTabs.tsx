import React from "react";
// import Typography from "@mui/material/Typography";
import { Typography, Tab, Tabs, Box } from "@mui/material";
import CardSkeleton from "../../../Common/Cards/CardSkeleton";
import { getLearningListApiCall } from "../../../utils/helper";
import { getCourseLandingPageURL } from "../../../utils/helperFns";
import LearningCard from "../LearningCard/LearningCard";
import { useCustomStyle } from "./ListTabs.style";
// import { getLearningListApiCall } from "../../Utils/helper";

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
      {value === index && <>{children}</>}
    </div>
  );
}

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ListTabs({ secondaryArgs = {}, authoringHelper = {} }: any) {
  const [value, setValue] = React.useState(0);
  const [courseList, setCourseList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const classes = useCustomStyle();
  const getOngoingList = async () => {
    setLoading(true);
    // await sleep(2000);
    const userId = localStorage.getItem("userId");
    if (userId?.length) {
      const res = await getLearningListApiCall({
        userId: userId,
        secondaryArgs: secondaryArgs,
      });
      const { data: { data: { getuserCourses = [] } = {} } = {} } = res;
      setCourseList(getuserCourses);
      setLoading(false);
    } else {
      setCourseList([]);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getOngoingList();
  }, []);

  const viewCourse = (item: any) => {
    if (authoringHelper.isEditPage) {
      return;
    } else {
      const url = getCourseLandingPageURL(
        secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        secondaryArgs?.prelemBaseEndpoint?.language,
        item.tag_name,
        item.key,
      );
      window.open(url);
    }
  };
  return (
    <Box className={`${classes.TabMainWrapper} TabWrapper`}>
      <Box className='tabTopBox'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          className='tabItemWrapper'
          TabIndicatorProps={{
            style: { background: "transparent" },
          }}>
          <Tab className='tabItem' label='Ongoing' {...tabProps(0)} />
          <Tab className='tabItem' label='New' {...tabProps(1)} disabled />
          <Tab className='tabItem' label='My Playlist' {...tabProps(2)} disabled />
          <Tab className='tabItem' label='Completed' {...tabProps(3)} disabled />
        </Tabs>
      </Box>
      <Box className='tabDetailWrapper'>
        <CustomTabPanel value={value} index={0}>
          <>
            {loading ? (
              <Box sx={{ position: "absolute", left: "50%", top: "40%" }}>
                {/* <ProductLoader /> */}
                <CardSkeleton />
              </Box>
            ) : courseList?.length > 0 ? (
              courseList.map((item, index) => {
                return <LearningCard item={item} key={index} viewCourse={viewCourse} />;
              })
            ) : (
              <Box className={classes.noResults}>
                <Typography variant='p3regular'>No results found</Typography>
              </Box>
            )}
          </>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}></CustomTabPanel>
        <CustomTabPanel value={value} index={2}></CustomTabPanel>
        <CustomTabPanel value={value} index={3}></CustomTabPanel>
      </Box>
    </Box>
  );
}
