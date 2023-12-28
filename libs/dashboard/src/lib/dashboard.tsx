import React, { Suspense } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Title from "../components/common/Title";
import { useStyles } from "./dashboard.styles";
import { useUserSession, useDashboardData } from "@platformx/authoring-apis";
import { store } from "@platformx/authoring-state";
import { Provider } from "react-redux";
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
    //   <div>
    //   {role === "Admin FIFA" ? (
    //     <FifaDashboard />
    //   ) : role === "Instructor" ? (
    //     <InstructorDashBoard />
    //   ) : (
    //     <Box className={classes.container}>
            <Provider store={store}>
            <Box>
              <Title titleVarient='h1bold' titleColor='#4B9EF9' padding='0' title={t("greets_x")} />
            </Box>
            </Provider>
            // <Box>
            //   <Title titleVarient='h1bold' padding='0' title={userInfo?.name} />
            // </Box>
    //       <Typography variant='h6medium' sx={{ marginTop: "18px" }}>
    //         {/* #TODO Commenting for X-Launch */}
    //         {taskLength > 0 && ` ${t("you_have")} ${taskLength} ${t("new_task")}`}{" "}
    //         {overDueTaskLength() > 0 &&
    //           `${t("and")} ${overDueTaskLength()} ${t("overdue_task_text")}`}
    //       </Typography>
    //       {/* Page And Content section */}
    //       <Box className={classes.sectionMargin}>
    //         <Grid container>
    //           <Grid item xs={12} md={12} em={12} lg={12} sx={{ paddingRight: { xs: 0, lg: 0 } }}>
    //             <TaskCard title={t("tasks")} titleVariant='h5bold' linkText={t("actions")}>
    //               <Box>
    //                 {dashBoard?.taskPages?.length > 0 ? (
    //                   <TaskPages
    //                     taskPages={dashBoard?.taskPages}
    //                     fetchDashBoardData={fetchDashBoardData}
    //                     edit={edit}
    //                   />
    //                 ) : (
    //                   <TaskNotFound />
    //                 )}
    //               </Box>
    //             </TaskCard>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //       <Box className={classes.sectionMargin}>
    //         <Grid container>
    //           <Grid
    //             item
    //             xs={12}
    //             md={12}
    //             em={12}
    //             lg={8}
    //             sx={{ paddingRight: { xs: 0, lg: "20px" } }}>
    //             <RecentCard
    //               title={t("recent_pages")}
    //               titleVariant='h5bold'
    //               linkText={t("view_more")}>
    //               {dashBoard?.recentPages?.length > 0 && (
    //                 <RecentPages recentPages={dashBoard.recentPages} />
    //               )}
    //             </RecentCard>
    //           </Grid>
    //           <Grid item xs={12} md={12} em={12} lg={4} sx={{ marginTop: { xs: "20px", lg: "0" } }}>
    //             <RecentCard title={t("recent_content")} titleVariant='h5bold'>
    //               {dashBoard?.recentContent?.length > 0 && (
    //                 <RecentContent
    //                   deleteContent={deleteContent}
    //                   duplicate={duplicate}
    //                   edit={edit}
    //                   unPublish={unPublish}
    //                   view={view}
    //                   preview={preview}
    //                   recentContent={dashBoard.recentContent}
    //                   fetchContentDetails={fetchContentDetails}
    //                 />
    //               )}
    //             </RecentCard>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //       {/* Start slider code here */}
    //       <Box className={classes.cardMargin}>
    //         <Box className={classes.cardText} pl='10px'>
    //           <Title titleVarient='h5bold' title={`${userInfo?.name}, ${t("to_create")}`} />
    //         </Box>
    //         <Box className='cardslider ml-m-15 mr-m-15'>
    //           {dashBoard?.createContent?.length > 0 && (
    //             <CardSlider
    //               createContent={dashBoard.createContent}
    //               colorList={dashBoard.colorArray}
    //             />
    //           )}
    //         </Box>
    //       </Box>
    //       {/* Boost your page section  */}
    //       <Box className={classes.boostMargin}>
    //         <Box className={classes.cardText}>
    //           <Title titleVarient='h5bold' title={t("boost_pages")} />
    //         </Box>
    //         {dashBoard?.boostContent?.length > 0 && (
    //           <HorizontalCardList boostContent={dashBoard.boostContent} />
    //         )}
    //       </Box>
    //       <Suspense fallback={<Typography variant='h3bold'>{t("loading")}</Typography>}>
    //         <Charts />
    //       </Suspense>
    //       <Suspense fallback={<Typography variant='h3bold'>{t("loading")}</Typography>}>
    //         {role === "viewer" && <ChartsForDemo />}
    //       </Suspense>
    //       {/* Your Scheduled Items */}
    //       {dashBoard?.scheduled?.length > 0 && (
    //         <Box className={classes.sectionMargin}>
    //           <Box className={classes.textMargin}>
    //             <Title titleVarient='h5bold' title={t("scheduled_items")} />
    //           </Box>

    //           <ScheduleCardList scheduledPages={dashBoard.scheduled} />
    //         </Box>
    //       )}
    //     </Box>
    //   )}
    // </div>
  );
}

export default Dashboard;
