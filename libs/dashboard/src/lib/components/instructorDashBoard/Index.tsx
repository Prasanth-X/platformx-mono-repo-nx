import { Box, Grid, Typography } from '@mui/material'
import { useDashboardData } from '@platformx/authoring-apis'
import { useUserSession } from '@platformx/utilities'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Title from '../../components/common/Title'
import { useStyles } from '../../dashboards.styles'
import { courseListMapper } from '../../utils/mapper'
import AllStudents from '../fifaDashboard/components/AllStudents'
import CourseCard from '../fifaDashboard/components/CourseCard'
import RecentCard from '../recentCard/RecentCard'
import RecentContent from '../recentContent/RecentContent'

const InstructorDashBoard = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [getSession] = useUserSession()
  const { userInfo, role } = getSession()
  const [courses, setCourses] = useState([])
  const {
    dashBoard,
    error,
    loading,
    deleteContent,
    duplicate,
    edit,
    preview,
    unPublish,
    view,
    fetchDashBoardData,
    fetchContentDetails,
  } = useDashboardData()

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

  useEffect(() => {
    dashBoard?.coursesList?.length !== 0 &&
      setCourses(courseListMapper(dashBoard?.coursesList))
  }, [dashBoard])

  return (
    <Box className={classes.container}>
      <Box sx={{ display: {xs: 'block', em: 'flex' }}}>
        <Title
          titleVarient="h2bold"
          titleColor="#4B9EF9"
          padding="0 5px 0 0"
          title={t('greets_x')}
        />
        <Title titleVarient="h2bold" title={userInfo?.name} />
      </Box>
      <Typography variant="h6medium" mt="5px">
        {/* #TODO Commenting for X-Launch */}
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
                  recentContent={dashBoard?.recentContent}
                  fetchContentDetails={fetchContentDetails}
                />
              )}
            </RecentCard>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '5px',
          border: '1px solid #EFF0F6',
          // height: "535px",
          marginTop: '23px',
          padding: '20px',
        }}
      >
        <Grid container spacing={3} sx={{ margin: '0' }}>
          <Grid item xs={12} sx={{ marginBottom: '20px' }}>
            <Typography variant="h5bold">All Courses</Typography>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              paddingBottom: '6px',
            }}
          >
            {courses?.length > 0 &&
              courses.map((course: any) => (
                <CourseCard key={course?.id} course={course} />
              ))}
          </Box>
        </Grid>
      </Box>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '5px',
          border: '1px solid #EFF0F6',
          marginTop: '23px',
          padding: '20px',
        }}
      >
        <Box className={classes.cardText}>
          <Title titleVarient="h5bold" title="All Users" />
        </Box>
        {(dashBoard?.userCourseList?.length || 0) > 0 && (
          <AllStudents users={dashBoard?.userCourseList} />
        )}
      </Box>
    </Box>
  )
}

export default InstructorDashBoard
