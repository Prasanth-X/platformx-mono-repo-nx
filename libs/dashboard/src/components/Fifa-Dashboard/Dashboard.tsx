import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Progress from '../../../assets/Frame.svg';
import AccountBalanceWallet from '../../../assets/account_balance_wallet.svg';
import grade from '../../../assets/grade.svg';
import Book from '../../../assets/svg/ReadBook.svg';
import TotalrevIcon from '../../../assets/totalrev.svg';
import useDashboardData from '@platformx/authoring-apis';
import { courseListMapper } from '../utils/mapper';
import AllStudents from './components/AllStudents';
import CourseCard from './components/CourseCard';
import LmsStatBox from './components/LmsStatBox';
import RadicalChart from './components/RadicalBar';
import SalesChart from './components/SalesChart';
import TopCourses from './components/TopCourses';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EcomDashboardProps {}

const Dashboard: React.FC<EcomDashboardProps> = () => {
  const [courses, setCourses] = useState([]);

  const { dashBoard } = useDashboardData();

  useEffect(() => {
    dashBoard?.coursesList?.length !== 0 &&
      setCourses(courseListMapper(dashBoard?.coursesList));
  }, [dashBoard]);

  return (
    <>
      <Box>
        <Box mt='15px'>
          <Box sx={{ display: 'flex', overflowX: 'auto', paddingBottom: '10px' }}>
              <Box
                sx={{ backgroundColor: '#D7ECFD', padding: '0 20px', marginRight: '15px', position: 'relative', minWidth: '285px' }}
                display='flex'
                alignItems='center'
                borderRadius='5px'
                justifyContent='center'
                height={150}
              >
                <LmsStatBox
                  heading='Total Visits in last 24 hrs'
                  subtitle='10800'
                  increase='108'
                  icon1={AccountBalanceWallet}
                  icon2={Progress}
                />
                <img
                  style={{
                    position: 'absolute',
                    marginTop: '-76px',
                    right: '20px',
                  }}
                  src={TotalrevIcon}
                  alt='total'
                />
              </Box>
              <Box
                sx={{ backgroundColor: '#DEF5D9', padding: '0 20px', marginRight: '15px', position: 'relative', minWidth: '285px' }}
                display='flex'
                alignItems='center'
                borderRadius='5px'
                justifyContent='center'
                height={150}
              >
                <LmsStatBox
                  heading='Total Moderators'
                  subtitle='34'
                  increase='106'
                  icon1={grade}
                  icon2={Progress}
                />
                <img
                  style={{
                    position: 'absolute',
                    marginTop: '-76px',
                    right: '20px',
                  }}
                  src={TotalrevIcon}
                  alt='total'
                />
              </Box>
              <Box
                sx={{ backgroundColor: '#FFF2D9', padding: '0 20px', marginRight: '15px', position: 'relative', minWidth: '285px' }}
                display='flex'
                alignItems='center'
                borderRadius='5px'
                justifyContent='center'
                height={150}
              >
                <LmsStatBox
                  heading='Total Active Course'
                  subtitle='4335'
                  increase='78'
                  icon1={Book}
                  icon2={Book}
                />
                <img
                  style={{
                    position: 'absolute',
                    marginTop: '-76px',
                    right: '20px',
                  }}
                  src={TotalrevIcon}
                  alt='total'
                />
              </Box>
              <Box
                sx={{ backgroundColor: '#EFF0F6', padding: '0 20px', marginRight: '15px', position: 'relative', minWidth: '285px' }}
                display='flex'
                alignItems='center'
                borderRadius='5px'
                justifyContent='center'
                height={150}
              >
                <LmsStatBox
                  heading='Total refrees'
                  subtitle='10800'
                  increase='108'
                  icon1={AccountBalanceWallet}
                  icon2={Progress}
                />
                <img
                  style={{
                    position: 'absolute',
                    marginTop: '-76px',
                    right: '20px',
                  }}
                  src={TotalrevIcon}
                  alt='total'
                />
              </Box>
              <Box
                sx={{ backgroundColor: '#FFECC7', padding: '0 20px', marginRight: '15px', position: 'relative', minWidth: '285px' }}
                display='flex'
                alignItems='center'
                borderRadius='5px'
                justifyContent='center'
                height={150}
              >
                <LmsStatBox
                  heading='Total Instructors'
                  subtitle='34'
                  increase='106'
                  icon1={grade}
                  icon2={Progress}
                />
                <img
                  style={{
                    position: 'absolute',
                    marginTop: '-76px',
                    right: '20px',
                  }}
                  src={TotalrevIcon}
                  alt='total'
                />
              </Box>
              <Box
                sx={{ backgroundColor: '#FFEBEE', padding: '0 20px', marginRight: '15px', position: 'relative', minWidth: '285px' }}
                display='flex'
                alignItems='center'
                borderRadius='5px'
                justifyContent='center'
                height={150}
              >
                <LmsStatBox
                  heading='Total Course Hours'
                  subtitle='1232.50'
                  increase='78'
                  icon1={Book}
                  icon2={Book}
                />
                <img
                  style={{
                    position: 'absolute',
                    marginTop: '-76px',
                    right: '20px',
                  }}
                  src={TotalrevIcon}
                  alt='total'
                />
              </Box>
          </Box>

          {/* ROW 2 */}
          <Grid container spacing={3} sx={{ margin: '0' }}>
            <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '18px' }}>
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '5px',
                  border: '1px solid #EFF0F6',
                  height: '415px',
                  marginTop: '24px',
                }}
              >
                <Box
                  mt='25px'
                  p='0 30px'
                  display='flex '
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='h5bold'>
                    New VAR rule Course Visits
                  </Typography>
                </Box>
                <Box height='250px' m='-20px 0 0 0'>
                  {/* <LineChart isDashboard={true} /> */}
                  {/* <BarChart isDashboard={true} /> */}
                  <SalesChart />
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* ROW 3 */}
          <Grid container spacing={3} sx={{ margin: '0' }}>
            <Grid
              item
              xs={12}
              md={12}
              lg={6}
              sx={{
                overflow: 'auto',
                mt: '25px',
                paddingRight: '12px',
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '5px',
                  border: '1px solid #EFF0F6',
                  height: '500px',
                  padding: '12px',
                }}
              >
                <Typography variant='h5bold'>Top Courses</Typography>
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  mt='25px'
                >
                  <TopCourses />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={6} sx={{ paddingRight: '12px' }}>
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '5px',
                  border: '1px solid #EFF0F6',
                  height: '500px',
                  padding: '12px',
                  mt: '25px',
                }}
              >
                <Typography variant='h5bold'>Top Cities</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10px',
                    marginLeft: '15px',
                  }}
                >
                  <RadicalChart />
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* ROW 4 */}
          <Grid container spacing={3} sx={{ margin: '0' }}></Grid>
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
                <Typography variant='h5bold'>All Courses</Typography>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  gap: '15px',
                  overflowX: 'auto',
                  paddingBottom: '6px',
                }}
              >
                {courses?.length > 0 &&
                  courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </Box>
            </Grid>
          </Box>
          {/* ROW 5 */}
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: '5px',
              border: '1px solid #EFF0F6',
              marginTop: '23px',
              padding: '20px',
            }}
          >
            <Grid container spacing={3} sx={{ margin: '0' }}>
              <Grid item xs={12} sx={{ marginBottom: '20px' }}>
                <Typography variant='h5bold'>All Users</Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '24px' }}>
                <Box sx={{ overflowX: 'auto' }}>
                  {dashBoard?.userCourseList?.length > 0 && (
                    <AllStudents users={dashBoard.userCourseList} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
