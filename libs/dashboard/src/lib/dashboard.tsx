import React, { Suspense } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Title from "../components/common/Title";
import { useStyles } from "./dashboard.styles";
import { useUserSession, useDashboardData } from "@platformx/authoring-apis";
import { useTranslation } from 'react-i18next';
// import CardSlider from "../components/CardSlider/CardSlider";
// import RecentCard from "../components/RecentCard/RecentCard";
// import FifaDashboard from "../components/Fifa-Dashboard/index";
// import HorizontalCardList from "../components/HorizontalCardList/HorizontalCardList";
// import InstructorDashBoard from "../components/InstructorDashBoard/Index";
// import RecentContent from "../components/RecentContent/RecentContent";
// import RecentPages from "../components/RecentPages/RecentPages";
// import ScheduleCardList from "../components/ScheduleCardList/ScheduleCardList";
// import TaskCard from "../components/Tasks/TaskContent/TaskCard";
// import TaskPages from "../components/Tasks/TaskPages/TasksPages";
// import TaskNotFound from "../components/TaskNotFound/TaskNotFound";


/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const { i18n } = useTranslation();
   const classes = useStyles();
   const { t } = useTranslation();
   const [ getSession ] = useUserSession();
   const { userInfo, role } = getSession();
  const {
    dashBoard,
    deleteContent,
    duplicate,
    edit,
    preview,
    unPublish,
    view,
    fetchDashBoardData,
    fetchContentDetails,
  } = useDashboardData();
  // const Charts = React.lazy(() =>
  //   import("./Charts/Charts").then((module) => ({
  //     default: module.default,
  //   })),
  // );
  // const ChartsForDemo = React.lazy(() =>
  //   import("./Charts/ChartsForDemo").then((module) => ({
  //     default: module.default,
  //   })),
  // );

  // const taskLength = dashBoard?.taskPages?.length || 0;

  // const overDueTaskLength = () => {
  //   let duetaskCount = 0;
  //   dashBoard?.taskPages?.forEach((val) => {
  //     if (new Date() > new Date(val.due_date)) {
  //       duetaskCount = duetaskCount + 1;
  //     }
  //   });
  //   return duetaskCount;
  // };

  return (
                    <Box>
                      <Title titleVarient='h1bold' titleColor='#4B9EF9' padding='0' title={t("greets_x")} />
                    </Box>
  );
}

export default Dashboard;
