import React, { Suspense } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Title from './components/common/Title'
import { useStyles } from './dashboard.styles'
import { useDashboardData } from '@platformx/authoring-apis'
import { useUserSession } from '@platformx/utilities'
import { useTranslation } from 'react-i18next'
import CardSlider from './components/cardSlider/CardSlider'
import FifaDashboard from './components/fifaDashboard/index'
import HorizontalCardList from './components/horizontalCardList/HorizontalCardList'
import InstructorDashBoard from './components/instructorDashBoard/Index'
import RecentCard from './components/recentCard/RecentCard'
import RecentContent from './components/recentContent/RecentContent'
import RecentPages from './components/recentPages/RecentPages'
import ScheduleCardList from './components/scheduleCardList/ScheduleCardList'
import TaskCard from './components/tasks/taskContent/TaskCard'
import TaskPages from './components/tasks/taskPages/TasksPages'
import TaskNotFound from './components/taskNotFound/TaskNotFound'

export const Dashboard = () => {
  console.warn('check 1')
  const classes = useStyles()
  const { t } = useTranslation()
  const [getSession] = useUserSession()
  const { userInfo, role } = getSession()
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
    changeStatus,
  } = useDashboardData()
  const { boostContent } = dashBoard || {}
  const Charts = React.lazy(() =>
    import('./components/charts/Charts').then((module) => ({
      default: module.default,
    })),
  )
  const ChartsForDemo = React.lazy(() =>
    import('./components/charts/ChartsForDemo').then((module) => ({
      default: module.default,
    })),
  )
  const taskLength = dashBoard?.taskPages?.length || 0
  const overDueTaskLength = () => {
    let duetaskCount = 0
    dashBoard?.taskPages?.forEach((val) => {
      if (new Date() > new Date(val.due_date)) {
        duetaskCount = duetaskCount + 1
      }
    })
    return duetaskCount
  }
  const renderRoleBasedDashboard = () => {
    switch (role) {
      case 'Admin FIFA':
        return <FifaDashboard />
      case 'Instructor':
        return <InstructorDashBoard />
      default:
        return (
          <Box className={classes.container} key={taskLength}>
            <Box sx={{ display: {xs: 'block', em: 'flex' }}}>
              <Title
                titleVarient="h2bold"
                titleColor="#4B9EF9"
                padding="0 5px 0 0"
                title={t('greets_x')}
              />
              <Title titleVarient="h2bold" title={userInfo?.name} />
            </Box>
            {/* #TODO Commenting for X-Launch */}
            <Typography variant="h6medium" mt="5px">
              {taskLength > 0 &&
                ` ${t('you_have')} ${taskLength} ${t('new_task')}`}{' '}
              {overDueTaskLength() > 0 &&
                `${t('and')} ${overDueTaskLength()} ${t('overdue_task_text')}`}
            </Typography>
            {/* Page And Content section */}
            <Box className={classes.sectionMargin}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={12}
                  em={12}
                  lg={12}
                  sx={{ paddingRight: { xs: 0, lg: 0 } }}
                >
                  <TaskCard
                    title={t('tasks')}
                    titleVariant="h5bold"
                    linkText={t('actions')}
                  >
                    <Box>
                      {taskLength > 0 ? (
                        <TaskPages
                          taskPages={dashBoard?.taskPages}
                          fetchDashBoardData={fetchDashBoardData}
                          changeStatus={changeStatus}
                          edit={edit}
                        />
                      ) : (
                        <TaskNotFound />
                      )}
                    </Box>
                  </TaskCard>
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.sectionMargin}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={12}
                  em={12}
                  lg={8}
                  sx={{ paddingRight: { xs: 0, lg: '20px' } }}
                >
                  <RecentCard
                    title={t('recent_pages')}
                    titleVariant="h5bold"
                    linkText={t('view_more')}
                  >
                    {(dashBoard?.recentPages?.length || 0) > 0 && (
                      <RecentPages recentPages={dashBoard?.recentPages || []} />
                    )}
                  </RecentCard>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  em={12}
                  lg={4}
                  sx={{ marginTop: { xs: '20px', lg: '0' } }}
                >
                  <RecentCard title={t('recent_content')} titleVariant="h5bold">
                    {(dashBoard?.recentContent?.length || 0) > 0 && (
                      <RecentContent
                        deleteContent={deleteContent}
                        duplicate={duplicate}
                        edit={edit}
                        unPublish={unPublish}
                        view={view}
                        preview={preview}
                        recentContent={dashBoard?.recentContent || []}
                        fetchContentDetails={fetchContentDetails}
                      />
                    )}
                  </RecentCard>
                </Grid>
              </Grid>
            </Box>
            {/* Start slider code here */}
            <Box className={classes.cardMargin}>
              <Box className={classes.cardText} pl="10px">
                <Title
                  titleVarient="h5bold"
                  title={`${userInfo?.name}, ${t('to_create')}`}
                />
              </Box>
              <Box className="cardslider ml-m-15 mr-m-15">
                {(dashBoard?.createContent?.length || 0) > 0 && (
                  <CardSlider
                    createContent={dashBoard?.createContent}
                    colorList={dashBoard?.colorArray}
                  />
                )}
              </Box>
            </Box>
            {/* Boost your page section  */}
            <Box className={classes.boostMargin}>
              <Box className={classes.cardText}>
                <Title titleVarient="h5bold" title={t('boost_pages')} />
              </Box>
              {(dashBoard?.boostContent?.length || 0) > 0 && (
                <HorizontalCardList boostContent={boostContent} />
              )}
            </Box>
            <Suspense
              fallback={
                <Typography variant="h3bold">{t('loading')}</Typography>
              }
            >
              <Charts />
            </Suspense>
            <Suspense
              fallback={
                <Typography variant="h3bold">{t('loading')}</Typography>
              }
            >
              {role === 'viewer' && <ChartsForDemo />}
            </Suspense>
            {/* Your Scheduled Items */}
            {(dashBoard?.scheduled?.length || 0) > 0 && (
              <Box className={classes.sectionMargin}>
                <Box className={classes.textMargin}>
                  <Title titleVarient="h5bold" title={t('scheduled_items')} />
                </Box>
                <ScheduleCardList scheduledPages={dashBoard?.scheduled} />
              </Box>
            )}
          </Box>
        )
    }
  }

  return <div>{renderRoleBasedDashboard()}</div>
}
